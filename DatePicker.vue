<template>
  <div
   class="date-picker"
   v-click-panel
  >
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text" :value="chooseDate" />
    </div>
    <div class="picker-panel" v-if="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" @click="changeYear('pre')" />
          <span class="picker-btn iconfont icon-prev-month" @click="changeMonth('pre')" />
          <span class="picker-date">
            {{ showDate.year }} 年 {{ showDate.month + 1 }} 月
          </span>
          <span class="picker-btn iconfont icon-next-month" @click="changeMonth('next')" />
          <span class="picker-btn iconfont icon-next-year" @click="changeYear('next')" />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >
              {{ week }}
            </div>
          </div>
          <div class="picker-days">
            <div
             v-for="date in getDay"
             :key="date.getTime()"
             :class="{
               'other-month': !isCur(date).month,
               'is-select': isCur(date).isSelected,
               'is-today': isCur(date).isToday
             }"
             @click="changeDate(date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    'click-panel'(el, binding, VNode) {
      const _this = VNode.context;
      document.onclick = e => {
        const dom = e.target;
        const isSonEl = el.contains(dom);

        if (!_this.showPanel && isSonEl) {
          _this.showPanel = !_this.showPanel;
        } else if (_this.showPanel && !isSonEl) {
          _this.showPanel = !_this.showPanel;
        }
      }
    }
  },
  created() {
    this.getTodayDate(this.date);
  },
  methods: {
    changeYear(type) {
      const yearDate = type === 'pre' ? -1 : 1;
      this.showDate.year += yearDate;
    },
    changeMonth(type) {
      const monthDate = type === 'pre' ? -1 : 1;
      this.showDate.month += monthDate;
      const { year, month } = this.showDate;
      const date = new Date(year, month).getMonth();
      this.showDate.month = date;

      // const month = type === 'pre' ? -1 : 1;
      // const minMonth = 0;
      // const maxMonth = 11;
      // this.showDate.month += month;
      // if (this.showDate.month + 1 === minMonth) {
      //   this.showDate.month = maxMonth;
      // } else if (this.showDate.month - 1 === maxMonth) {
      //   this.showDate.month = minMonth;
      // }
    },
    changeDate(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year,
        month,
        day
      };
      this.showPanel = !this.showPanel;
    },
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year,
        month,
        day,
      };
    },
    getTodayDate(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year,
        month,
        day,
      };
    },
    isCur(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      const chooseDate = this.chooseDate;
      const { year:chooseYear, month:chooseMonth } = this.getYearMonthDay(new Date(chooseDate));
      const { year:curYear, month:curMonth, day:curDay } = this.getYearMonthDay(new Date());
      const { year:showYear, month:showMonth, day:showDay } = this.showDate;
      return {
        month: year === chooseYear && month === chooseMonth,
        isToday: year === curYear && month === curMonth && day === curDay,
        isSelected: year === showYear && month === showMonth && day == showDay
      }
    }
  },
  props: {
    date: Date,
    default: () => new Date(),
  },
  data() {
    return {
      showDate: {
        year: 0,
        month: 0,
        day: 0,
      },
      showPanel: false
    };
  },
  computed: {
    chooseDate() {
      const { year, month, day } = this.showDate;
      return `${year}-${month + 1}-${day}`;
    },
    getDay() {
      const { year, month } = this.showDate;
      const firstDay = new Date(year, month);
      const week = firstDay.getDay();
      const startDay = firstDay - week * 24 * 60 * 60 * 1000;
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
  },
};
</script>

<style>
@import "./assets/font.css";

.date-picker {
  display: inline-block;
}

.picker-input {
  position: relative;
}

.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}

.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}

.picker-panel .picker-arrow::after {
  position: absolute;
  left: -6px;
  top: 1px;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}

.picker-panel .picker-body {
}

.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
}
.picker-panel .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}

.picker-panel .picker-date {
  margin-left: 60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
}

.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}

.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}

.picker-panel .picker-days div:hover {
  color: #409eff;
}

.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}

.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}

.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>