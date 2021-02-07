<script>
export default {
  functional: true,
  render (createElement, context) {
    const { slots } = context;

    return (
      <transition name="single">
        { slots().default }
      </transition>
    )
  }
}
</script>

<style>
.single-enter,
.single-leave-to {
  opacity: 0;
}

.single-enter-active,
.single-leave-active {
  transition: opacity .3s;
}

.single-enter-to,
.single-leave {
  opacity: 1;
}
</style>