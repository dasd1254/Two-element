<template>
  <el-col id="ct-col" :span="span">
    <slot />
  </el-col>
</template>
<script>
export default {
  name: 'CtCol',
  props: {
    span: {
      type: Number,
      default() {
        return 5
      }
    }
  }
}
</script>
<style>
#ct-col {
  height: 100%;
}
</style>
