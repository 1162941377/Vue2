<template>
  <ul class="tree">
    <li 
     class="tree-node"
     v-for="(node, index) in data"
     :key="node[defaultProps.label]"
    >
      <i
      v-if="node[defaultProps.children]"
       class="iconfont"
       :class="{
           'icon-down': !showData[index],
           'icon-right': showData[index]
       }"
       ></i>
      <span
       class="node-label"
       @click="handleClick(index)"
      >{{ node[defaultProps.label] }}</span>
      <keep-alive>
        <base-tree
         :data="showData[index] && node[defaultProps.children]"
         v-if="showData[index] && node[defaultProps.children]"
        ></base-tree>
      </keep-alive>
    </li>
  </ul>
</template>

<script>
export default {
    data() {
        return {
            showData: []
        }
    },
    methods: {
        handleClick(index) {
            const flag = !this.showData[index];
            this.$set(this.showData, index, flag);
        }
    },
    name: 'base-tree',
    props: {
        data: {
            type: Array,
            require: true
        },
        // 提高代码的复用性
        defaultProps: {
            type: Object,
            default: () => ({
                label: 'label',
                children: 'children'
            })
        }
    }
};
</script>

<style>
@import "./assets/font.css";

li {
  list-style: none;
}

.tree-node {
  cursor: pointer;
}

.tree-node .iconfont {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}

.tree-node .node-label {
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
}
</style>