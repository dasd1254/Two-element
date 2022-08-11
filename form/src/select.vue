<template>
  <el-form-item :label="label" :prop="selectProp" :rules="rules">
    <el-select
      v-model="selectData"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      :placeholder="placeholder"
      :clearable="selectClearable"
      @change="selectChange"
    >
      <el-option
        v-for="item in selectDataList"
        :key="item.id"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  name: 'CtSelect',
  props: {
    collapseTags: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    label: {
      type: String,
      default() {
        return ''
      }
    },
    selectProp: {
      type: String,
      default() {
        return ''
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    selectDataList: {
      type: Array,
      default() {
        return []
      }
    },
    selectClearable: {
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    selectValue: {
      type: [String, Array]
    }
  },
  data() {
    return {
      selectData: this.selectValue
    }
  },
  watch: {
    selectData(val) {
      this.$emit('selectChange', this.selectData)
    },
    selectValue(val) {
      this.selectData = val
    }
  },
  methods: {
    selectChange() {
      // debugger
      this.$emit('selectChange', this.selectData)
      // console.log(this.selectData,"selectChageData")
    }
  }
}
</script>
