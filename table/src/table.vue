<template>
  <div class="table">
    <el-table
      id="ctTable"
      ref="mutipleTable"
      v-loading.ctTable="options.loading"
      border
      :data="list"
      :stripe="options.stripe"
      size="mini"
      :header-cell-style="{ background: '#F4F4F4', color: '#555' }"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"
    >
      <!-- 第一列固定checkbox-->
      <el-table-column v-if="options.mutiSelect" type="selection" />

      <!--2+数据列 columns为后台模拟数据-->
      <template v-for="column in columns">
        <!-- 表头动态参数 -->
        <el-table-column
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :header-align="column.headeralign"
        >
          <!-- 插槽td -->
          <template slot-scope="scope">
            <template v-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)" />
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot />
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'CtTable',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }, // 数据列表
    columns: {
      type: Array,
      default() {
        return []
      }
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    options: {
      type: Object,
      default() {
        return {
          stripe: false, // 是否为斑马纹 table
          highlightCurrentRow: false // 是否要高亮当前行
        }
      }
    } // table 表格的控制参数
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
      console.log(row.id)
      this.$emit('handleCellClick', row)
      // console.log(column)
      // console.log(event)
      // console.log(cell)
    }
  }
}
</script>
