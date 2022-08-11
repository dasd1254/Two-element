// 要使用 Radio 组件，只需要设置v-model绑定变量， // 选中意味着变量的值为相应
Radio label属性的值， // label可以是String、Number或Boolean。
<template>
  <el-form-item :label="label" :prop="radioProp" :rules="rules">
    <el-radio-group v-model="radioData">
      <el-radio
        v-for="item in radioDataList"
        :key="item.id"
        :label="item.label"
        :disabled="radioDisabled"
        @change="radioChange"
      />
    </el-radio-group>
  </el-form-item>
</template>
<script>
export default {
  name: 'CtRadio',
  props: {
    radioValue: {
      type: String,
      default() {
        return ''
      }
    },
    radioProp: {
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
    radioDisabled: {
      type: Boolean
    },
    radioDataList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      radioData: this.radioValue
    }
  },
  watch: {
    radioData(val) {
      this.$emit('radioChange', this.radioData)
    },
    radioValue(val) {
      this.radioData = val
    }
  },
  methods: {
    radioChange() {
      this.$emit('radioChange', this.radioData)
    }
  }
}
</script>
