<template>
  <el-row id="ct-row">
    <slot />
  </el-row>
</template>
<script>
export default {
  name: 'CtRow'
}
</script>
<style>
#ct-row {
  height: 100%;
}
</style>
