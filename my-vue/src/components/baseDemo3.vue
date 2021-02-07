<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     appear
    >
      <div
       class="react"
       v-if="show"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateX(300px);
}

.v-enter-active,
.v-leave-active {
    transition: all 1s;
}

.v-enter-to,
.v-leave {
    opacity: 1;
    transform: translateX(0px);
}

.react {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-color: #008c8c;
}
</style>