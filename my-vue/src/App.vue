<template>
<base-model></base-model>
</template>

<script>
// <template>
// <div id="app">
//   <base-level :level="1">标题</base-level>
//   <base-level :level="2">标题</base-level>
//   <base-level :level="3">标题</base-level>
//   <base-level :level="4">标题</base-level>
//   <base-level :level="5">标题</base-level>
//   <base-level :level="6">标题</base-level>
// </div>
// </template>
// <template>
//   <div id="app" class="app">
//     <img alt="Vue logo" src="./assets/logo.png">
//     <HelloWorld msg="Welcome to Your Vue.js App"/>
//   </div>
// </template>
// import HelloWorld from './components/HelloWorld.vue'

import baseIfFor from './components/baseIfFor'
import baseLevel from './components/base-level'
import baseOn from './components/base-on'
import baseModel from './components/baseModel'

export default {
  name: 'App',
  components: {
    // HelloWorld
    baseLevel,
    baseOn,
    baseIfFor,
    baseModel
  },
  render(createElement) {
    return createElement('a', {
      class: {
        isShow: false,
        isSelected: true
      },
      style: {
        color: 'red',
        fontSize: '14px',
        backgroundColor: '#008c8c'
      },
      attrs: {
        id: 'name'
      },
      domProps: {
        innerHTML: '<span>hehe</span>'
      },
      on: {
        click() {
          console.log('hehe');
        }
      },
      nativeOn: {
        click() {
          console.log('hehe');
        }
      }
    }, [
      createElement('div', 'text'),
      'textContent'
    ]);
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
