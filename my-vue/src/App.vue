<template>
  <div id="app">
    <button @click="show = true">click</button>
    <async-cmp-1 v-if="show"></async-cmp-1>
    <async-cmp-2 v-if="show"></async-cmp-2>
  </div>
</template>

<script>
// <template>
//   <div id="app">
//     <button @click="show = !show">click</button>
//     <!-- <transition-single>
//       <div v-if="show">hello world</div>
//     </transition-single>

//     <transition-single>
//       <div v-if="show">hello zou</div>
//     </transition-single> -->

//     <transition-single>
//       <div v-if="show" key="world">hello world</div>
//       <div v-else key="zou">hello zou</div>
//     </transition-single>
//   </div>
// </template>
// import TransitionSingle from "./components/TransitionSingle";

export default {
  name: "app",
  components: {
    // TransitionSingle,
    AsyncCmp1: () => import(/* webpackChunkName: 'async' */ './components/Async1'),
    AsyncCmp2: () => import(/* webpackChunkName: 'async' */ './components/Async2')
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>