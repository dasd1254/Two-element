<template>
  <el-form-item :label="label" :prop="dateProp" :rules="rules">
    <el-date-picker
      v-model="dateData"
      :type="dateType"
      :placeholder="placeholder"
      :value-format="dateValueFormat"
      @change="dateChange"
    />
  </el-form-item>
</template>
<script>
export default {
  name: 'CtDatetimePicker',
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    dateProp: {
      type: String,
      default() {
        return ''
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
    dateValue: {
      type: String,
      default() {
        return ''
      }
    },
    dateType: {
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
    dateValueFormat: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dateData: this.dateValue
    }
  },
  watch: {
    dateData(val) {
      this.$emit('dateChange', this.dateData)
    },
    dateValue(val) {
      this.dateData = val
    }
  },
  methods: {
    dateChange() {
      this.$emit('dateChange', this.dateData)
    }
  }
}
</script>
