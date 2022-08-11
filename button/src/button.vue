<template>
  <button
    class="ct-button"
    :class="checkClass()"
    :disabled="disabled"
    type="button"
    @click="clickFn($event)"
  >
    <span>
      <slot />
    </span>
  </button>
</template>
<script>
export default {
  name: 'CtButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    clickFn(event) {
      this.$emit('click', event)
    },
    checkClass() {
      // 判断是否禁用
      let disabled = ''
      if (this.disabled) {
        disabled = 'disabled'
      }
      return `ct-button-${this.type} size-${this.size} ${disabled}`
      // return 'ct-button-' + this.type + ' size-' + this.size + ' ' + disabled;
    }
  }
}
</script>
<style>
.ct-button {
  box-sizing: border-box;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  width: 64px;
  border-radius: 3px;
  border: none;
}
/* 默认尺寸 */
.size-default {
  color: #fff;
}
/* 大型尺寸*/
.size-large {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  width: 80px;
}
/* 默认颜色 */
.ct-button.ct-button-default {
  color: #fff;
  background-color: #4b90c8;
}
.ct-button.ct-button-default:active,
.ct-button.ct-button-default:hover {
  background: #00489e;
}
/* 保存按钮 */
.ct-button.ct-button-save {
  color: #fff;
  background-color: #2cb43f;
}
.ct-button.ct-button-save:active,
.ct-button.ct-button-save:hover {
  background: #128f22;
}
/* 提交按钮 */
.ct-button.ct-button-submit {
  color: #fff;
  background-color: #ff6600;
}
.ct-button.ct-button-submit:active,
.ct-button.ct-button-submit:hover {
  background: #f13300;
}
/* 其他按钮 */
.ct-button.ct-button-other {
  color: #555;
  background-color: #fff;
  border: 1px solid #bbbbbb;
  height: 26px;
  line-height: 24px;
}
.ct-button.ct-button-other:active,
.ct-button.ct-button-other:hover {
  height: 26px;
  line-height: 24px;
  background: #e2edf6;
  color: #0251c1;
  border-color: #4b90c8;
}
.ct-button.ct-button-submit:active,
.ct-button.ct-button-submit:hover {
  background: #f13300;
}
/* 警示按钮 */
.ct-button.ct-button-warn {
  color: #fff;
  background-color: #f13300;
}
.ct-button.ct-button-warn:active,
.ct-button.ct-button-warn:hover {
  background: #dd0000;
}
/* 不可用按钮 */
.ct-button.disabled,
.ct-button.disabled:hover,
.ct-button.disabled:active {
  background: #aaa;
  color: #fff;
  cursor: no-drop;
}
</style>
