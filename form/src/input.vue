/* * @property { rules : {String Object} 表单验证 一种验证传对象
一种以上把对象组成数组 } * @property { prop : {String} input的name
传回的字段名与html中input标签name值一样。 } * @property { placeholder : {String}
提示语，与html中input标签placeholder值一样。 } * @property { label : {String}
标签文本。 } * @property { v-model : {String}
语法糖，利用value接值父子组件相互传值 当前表单填写的内容 } */
<template>
  <el-form-item :label="label" :prop="prop" :rules="rules">
    <el-input
      v-model="myValue"
      :row="row"
      :placeholder="placeholder"
      :type="type"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :disabled="disabled"
      :readonly="readonly"
      @blur="blur"
    />
  </el-form-item>
</template>
<script>
export default {
  name: 'CtInput',
  props: {
    row: {
      type: String,
      default() {
        return ''
      }
    },
    inputValue: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
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
    number: {
      type: String,
      default() {
        return ''
      }
    },
    prefixIcon: {
      type: String,
      default() {
        return ''
      }
    },
    suffixIcon: {
      type: String,
      default() {
        return ''
      }
    },
    prop: {
      type: String,
      default() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    value: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array]
  },
  data() {
    return {
      myValue: this.inputValue
    }
  },
  // 在子组件中监听父级传过来的值
  watch: {
    inputValue(val) {
      this.myValue = val
    },
    myValue(val) {
      this.$emit('input', this.myValue)
    }
  },
  methods: {
    blur() {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
<style>
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
