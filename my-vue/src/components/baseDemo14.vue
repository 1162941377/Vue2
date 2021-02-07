<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition-group>
        <div key="world" v-if="show">hello world</div>
        <div key="zou" v-if="show">hello zou</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
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