<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
     :css="false"
     @before-enter="beforeEnter"
     @enter="enter"
     @after-enter="afterEnter"
     @enter-cancelled="enterCancelled"
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
      show: true,
      x: 200
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = 'translateX(200px)';
    },
    enter(el, done) {
      done.cancelled = true;
      const timer = setInterval(() => {
        this.x -= 2;
        el.style.transform = `translateX(${this.x}px)`;

        if (this.x <= 0) {
          clearInterval(timer);
          done();
        }
      }, 10);
    },
    afterEnter() {
      this.x = 200;
    },
    enterCancelled() {
      console.log('cancel');
    }
  }
}
</script>

<style scoped>
.box {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 100px;
  border: 1px solid red;
  color: red;
}
</style>