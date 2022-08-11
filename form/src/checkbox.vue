<template>
  <el-form-item :label="label" :prop="checkboxProp" :rules="rules">
    <el-checkbox-group v-model="checkboxData">
      <el-checkbox
        v-for="item in checkboxDataList"
        :key="item.id"
        :label="item.label"
        @change="checkboxChange"
      />
    </el-checkbox-group>
  </el-form-item>
</template>
<script>
export default {
  name: 'CtCheckbox',
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    checkboxProp: {
      type: String,
      default() {
        return ''
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
    checkboxDataList: {
      type: Array,
      default() {
        return []
      }
    },
    checkboxValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      checkboxData: this.checkboxValue
    }
  },
  watch: {
    checkboxData(val) {
      this.$emit('checkboxChange', this.checkboxData)
    },
    checkboxValue(val) {
      this.checkboxData = val
    }
  },
  methods: {
    checkboxChange() {
      // debugger
      this.$emit('checkboxChange', this.checkboxData)
    }
  }
}
</script>
