<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     enter-active-class="animate__fadeInRight animate__animated"
     leave-active-class="animate__animated animate__fadeOutUp"
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
      show: false
    }
  }
}
</script>

<style scoped>
.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity .3s;
}

.v-enter-to {
  opacity: 1;
}

.react {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-color: #008c8c;
}
</style>