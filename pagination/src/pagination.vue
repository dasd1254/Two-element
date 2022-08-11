<template>
  <div class="page-wrapper">
    <span>第{{ page.current }}页/共{{ page.pages }}页</span>
    <span>共{{ page.total }}条记录</span>
    <span @click="changePage('home')">首页</span>
    <span @click="changePage('pre')">上一页</span>
    <span @click="changePage('next')">下一页</span>
    <span @click="changePage('last')">末页</span>
    <span>
      每页
      <select
        v-model="itemSelected"
        name="public-choice"
        @change="getItemSelected"
      >
        <option
          v-for="item in optionList"
          :key="item.id"
          :value="item.count"
          style="outline:none"
        >
          {{ item.count }}
        </option>
      </select>
    </span>
    <span>
      跳至
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <input
        v-model="page.current"
        style="width:34px"
        type="number"
        min="1"
        max="10"
      />页
      <ct-button type="other" @click="jumpTo()">确定</ct-button>
    </span>
  </div>
</template>
<script>
export default {
  // 写事件很简单，点击按钮改变页码，并传递页码信息给父级。
  // 传递进来的参数需要接收，并赋值给当前组件。
  name: 'CtPagination',
  props: {
    childMsg: {
      type: Object,
      default: function() {
        return {
          size: 25,
          pages: 0,
          current: 1,
          total: 0
        }
      }
    },
    optionList: {
      type: Array,
      default: function() {
        return [
          {
            id: '1',
            count: '10'
          },
          {
            id: '2',
            count: '50'
          },
          {
            id: '3',
            count: '100'
          },
          {
            id: '4',
            count: '500'
          } /* ,
          {
            id: '5',
            count: '1000'
          },
          {
            id: '6',
            count: '5000'
          } */
        ]
      }
    }
  },
  data() {
    return {
      page: {
        size: this.childMsg.size /* 每页数 */,
        pages: this.childMsg.pages /* 总页数 */,
        current: this.childMsg.current /* 当前页 */,
        total: this.childMsg.total /* 总条数 */
      },
      val: ''
    }
  },
  watch: {
    /* 总页数初始值问题解决办法：监听值的变化 */
    childMsg: {
      handler(newValue) {
        this.page.pages = newValue.pages
        this.page.total = newValue.total
        this.page.current = newValue.current
      },
      deep: true
    }
  },
  created() {
    this.itemSelected = this.optionList[0].count
  },
  methods: {
    getItemSelected() {
      this.page.size = this.itemSelected
      this.childMsg.size = this.itemSelected
      this.page.current = 1
      this.childMsg.current = 1
      // this.$emit('pageSizes', this.page.size)
      this.changePage()
    },
    jumpTo() {
      if (this.page.current === null || this.page.current === '') {
        this.page.current = 1
        this.childMsg.current = 1
      }
      if (this.page.current > this.childMsg.pages) {
        this.page.current = this.childMsg.pages
      }
      this.changePage()
    },
    changePage(type) {
      /* 仅改变当前页码操作 */
      switch (type) {
        case 'home':
          this.page.current = 1
          this.childMsg.current = 1
          break
        case 'pre':
          if (this.page.current > 1) {
            this.page.current--
            this.childMsg.current--
          }
          break
        case 'next':
          if (this.page.current < this.page.pages) {
            this.page.current++
            this.childMsg.current++
          }
          break
        case 'last':
          this.page.current = this.page.pages
          this.childMsg.current = this.page.pages
          break
        default:
          this.childMsg.current = parseInt(this.page.current)
          break
      }
      this.$emit('callFather', this.page)
    }
  }
}
</script>
<style scoped>
.page-wrapper {
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
}
span {
  margin: 0 5px;
  color: #0049b4;
}
span:nth-child(n + 2) {
  cursor: pointer;
}
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
