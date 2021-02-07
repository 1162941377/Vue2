<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     :duration="1000"
     enter-active-class="animate__animated tada v-enter-active"
     leave-active-class="animate__animated tada v-leave-active"
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
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 13s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}

.react {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-color: #008c8c;
}
</style>