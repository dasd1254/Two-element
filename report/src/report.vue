<template>
  <div>
    <el-table :data="tableData" max-height="420">
      <el-table-column
        v-for="item in colData"
        :key="item.id"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        align="center"
      >
        <div v-if="item.children || item.children.length > 0">
          <el-table-column
            v-for="item1 in item.children"
            :key="item1.id"
            :label="item1.label"
            :prop="item1.prop"
            :width="item1.width"
            align="center"
          >
            <div v-if="item1.children || item1.children.length > 0">
              <el-table-column
                v-for="item2 in item1.children"
                :key="item2.id"
                :label="item2.label"
                :prop="item2.prop"
                :width="item2.width"
                align="center"
              />
            </div>
          </el-table-column>
        </div>
      </el-table-column>
    </el-table>
    <ct-pagination :child-msg="page" @callFather="getPagination" />
  </div>
</template>

<script>
export default {
  name: 'CtReport',
  props: {
    //
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    //
    colData: {
      type: Array,
      default() {
        return []
      }
    },
    page: {
      type: Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    getPagination() {
      this.$emit('callFather', this.page)
    }
  }
}
</script>

<style></style>
