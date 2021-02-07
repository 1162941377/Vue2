<template>
  <div class="demo">
    <button @click="handleClick(keyName)">click</button>
    <transition>
      <div :key="keyName">hello {{ keyName }}</div>
    </transition>
  </div>
</template>

<script>
// <template>
//   <div class="demo">
//     <button @click="show = !show">click</button>
//     <transition>
//         <div v-if="show" key="world">hello world</div>
//         <div v-else key="hello">你好，世界</div>
//     </transition>
//   </div>
// </template>
export default {
  data() {
    return {
      // show: false,
      keyName: "world",
    };
  },
  methods: {
    handleClick(resName) {
        const res = resName === 'world' ? 'zou' : 'world';
        this.keyName = res;
    },
  },
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>