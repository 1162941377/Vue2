<template>
  <div class="demo">
    <button @click="handleClick">click</button>
    <transition
     model="in-out"
    >
      <component :is="cmpName" />
    </transition>
  </div>
</template>

<script>
import Demo1 from "./baseDemo13-1";
import Demo2 from "./baseDemo13-2";

export default {
  components: {
    Demo1,
    Demo2,
  },
  data() {
    return {
      cmpName: "Demo1",
    };
  },
  methods: {
    handleClick() {
      const isDemo1 = this.cmpName === "demo1";
      this.cmpName = isDemo1 ? "demo2" : "demo1";
    },
  },
};
</script>

<style scoped>
.demo {
  margin-left: 100px;
}

button {
  display: block;
}

.v-enter {
  opacity: 0;
  transform: translateX(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-leave,
.v-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}
</style>