<script>
// <template>
//     <h1 v-if="level === 1">
//         <slot></slot>
//     </h1>
//     <h2 v-else-if="level === 2">
//         <slot></slot>
//     </h2>
//     <h3 v-else-if="level === 3">
//         <slot></slot>
//     </h3>
//     <h4 v-else-if="level === 4">
//         <slot></slot>
//     </h4>
//     <h5 v-else-if="level === 5">
//         <slot></slot>
//     </h5>
//     <h6 v-else-if="level === 6">
//         <slot></slot>
//     </h6>
//     <span v-else>
//         你在逗我吗，只能是 1-6 之间的数字
//     </span>
// </template>
export default {
    // 这是根据传入的数字，生成对应的 h（1-6）标签的组件
    name: 'base-level',
    props: {
        level: Number
    },
    render(createElement) {
        const VNode =  createElement('h' + this.level, this.$slots.default);
        console.log(VNode);
        return VNode;
    }
}
</script>