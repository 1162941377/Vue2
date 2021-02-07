<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     :css="false"
     @before-enter="beforeEnter"
     @enter="enter"
     @before-leave="beforeLeave"
     @leave="leave"
    >
      <div
       class="box"
       v-if="show"
      >hello world</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      Velocity(el, {
        opacity: 1
      }, {
        duration: 500
      });
      Velocity(el, {
        rotateZ: 10
      }, {
        duration: 300
      });
      Velocity(el, {
        rotateZ: -10
      }, {
        duration: 300
      });
      Velocity(el, {
        rotateZ: 0
      }, {
        duration: 300,
        complete: done
      });
    },
    beforeLeave(el) {
      el.style.transformOrigin = 'left';
    },
    leave(el, done) {
      Velocity(el, {
        translateX: '15px',
        rotateZ: '50deg'
      }, {
        duration: 600
      });
      Velocity(el, {
        rotateZ: '100deg'
      }, {
        duration: 600,
        loop: 2
      });
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, {
        complete: done
      });
    }
  }
}
</script>

<style scoped>
.demo {
  padding-left: 50px;
  padding-top: 30px;
}

.box {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid red;
  color: red;
}
</style>