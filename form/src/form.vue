<template>
  <el-form
    :model="model"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :inline="inline"
    :size="formSize"
  >
    <slot />
  </el-form>
</template>
<script>
export default {
  name: 'CtForm',
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default() {
        return ''
      }
    },
    labelPosition: {
      type: String,
      default() {
        return ''
      }
    },
    inline: {
      type: Boolean
    },
    formSize: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>
