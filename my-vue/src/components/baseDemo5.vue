<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition>
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
      show: false
    }
  }
}
</script>

<style scoped>
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(400px) scale(1);
  }

  50% {
    opacity: .5;
    transform: translateX(200px) scale(1.5);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.v-enter-active {
  animation: animate 1s;
}

.v-leave-active {
  animation: animate 1s reverse;
}

.react {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-color: #008c8c;
}
</style>