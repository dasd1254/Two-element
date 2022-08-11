<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</template>
<script>
export default {
  name: 'CtTree',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
    }
  }
}
</script>
<style lang="scss">
.el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.el-tree .el-icon-caret-right:before {
  background: url('../../../src/assets/file_close.png') no-repeat;
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  background-size: 100%;
  line-height: 20px;
}
.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  background: url('../../../src/assets/file_open.png') no-repeat;
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  background-size: 100%;
  line-height: 20px;
}
.el-tree-node__expand-icon.is-leaf::before {
  display: none;
}
</style>
