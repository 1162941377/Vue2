<template>
  <div class="class">
    <button>1</button>
    <button>2</button>
    <button>3</button>
  </div>
</template>

<script>
export default {
  name: "base-on",
  render(createElement) {
    return createElement("button", {
        nativeOn: {
            click() {
                console.log('hehe');
            }
        }
    });
  },
};
</script>