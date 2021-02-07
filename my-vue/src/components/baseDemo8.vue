<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     appear
     appear-active-class="animate__animated animate__swing"
     enter-active-class="animate__animated animate__tada"
     leave-active-class="animate__animated animate__tada"
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
  }
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

.box {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  line-height: 100px;
  text-align: center;
  border: 1px solid red;
  color: red;
}
</style>