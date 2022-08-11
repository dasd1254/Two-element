<template>
  <el-form-item :label="label" :prop="switchProp" :rules="rules">
    <el-switch
      v-model="switchData"
      :active-color="switchActiveColor"
      :inactive-color="switchInactiveColor"
      :active-value="switchActiveValue"
      :inactive-value="switchInactiveValue"
      :disabled="switchDisabled"
      @change="switchChange"
    />
  </el-form-item>
</template>
<script>
export default {
  name: 'CtSwitch',
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    switchProp: {
      type: String,
      default() {
        return ''
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
    switchActiveColor: {
      type: String,
      default() {
        return ''
      }
    },
    switchInactiveColor: {
      type: String,
      default() {
        return ''
      }
    },
    switchActiveValue: {
      type: Number,
      default() {
        return 0
      }
    },
    switchInactiveValue: {
      type: Number,
      default() {
        return 0
      }
    },
    switchDisabled: {
      type: Boolean
    },
    switchValue: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      switchData: this.switchValue
    }
  },
  watch: {
    switchData(val) {
      this.$emit('switchChange', this.switchData)
    },
    switchValue(val) {
      this.switchData = val
    }
  },
  methods: {
    switchChange() {
      // debugger
      this.$emit('switchChange', this.switchData)
    }
  }
}
</script>
