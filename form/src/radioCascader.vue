<template>
  <el-form-item :label="label" :prop="cascaderProp" :rules="rules">
    <el-cascader
      v-model="cascaderData"
      :options="cascaderDataList"
      :props="cascaderProps"
      :clearable="cascaderClearable"
      @change="cascaderChange"
    />
  </el-form-item>
</template>
<script>
export default {
  name: 'CtRadioCascader',
  props: {
    cascaderProp: {
      type: String,
      default() {
        return ''
      }
    },
    label: {
      type: String,
      default() {
        return ''
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
    cascaderDataList: {
      type: Array,
      default() {
        return []
      }
    },
    cascaderClearable: {
      type: Boolean
    },
    cascaderProps: {
      type: Object,
      default() {
        return {}
      }
    },
    cascaderValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cascaderData: this.cascaderValue
    }
  },
  watch: {
    cascaderData(val) {
      this.$emit('cascaderChange', this.cascaderData)
    },
    // 监听父组件传递过来的值
    cascaderValue(val) {
      this.cascaderData = val
    }
  },
  methods: {
    cascaderChange() {
      // debugger
      this.$emit('cascaderChange', this.cascaderData)
    }
  }
}
</script>
