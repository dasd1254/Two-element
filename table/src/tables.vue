<template>
  <el-table
    ref="mutipleTable"
    :height="options.height"
    border
    :data="list"
    :header-cell-style="{ background: '#F4F4F4', color: '#555' }"
    :stripe="options.stripe"
    @cell-click="handleCellClick"
    @selection-change="handleSelectionChange"
  >
    <div slot="empty">
      <v-nolist :text="'暂无数据'" />
    </div>
    <slot />
  </el-table>
</template>
<script>
import VNolist from '@/components/no-list'
export default {
  name: 'CtTables',
  components: { VNolist },
  props: {
    // 数据列表
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // table 表格的控制参数
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  // 数据
  data() {
    return {
      pageIndex: 1,
      multipleSelection: [], // 多行选中
      dialogVisible: false
    }
  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 行事件
    handleCellClick(row, column, event, cell) {
      // console.log(row.id)
      this.$emit('handleCellClick', row)
      // console.log(column)
      // console.log(event)
      // console.log(cell)
    }
  }
}
</script>
