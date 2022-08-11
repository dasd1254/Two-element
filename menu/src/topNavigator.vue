<template>
  <div>
    <div class="ct-menu">
      <ul class="ct-menu-sub">
        <li
          v-for="(item, index) in data"
          :key="item.id"
          style="cursor: pointer;"
          :class="{ activeChange: index == current }"
          @click="doActive(index)"
        >
          <span v-if="item.children.length">{{ item.meta.title }}</span>
          <router-link
            v-else
            :key="item.id"
            :to="{ path: item.path }"
            tag="span"
            @click.native="changeRouter(item.meta.title)"
          >
            <!-- @click.native="menuClick(item)" -->
            {{ item.meta.title }}
          </router-link>
          <!-- 二级菜单 -->
          <ul class="ct-menu-child">
            <li v-for="child in item.children" :key="child.id">
              <span v-if="child.children.length">
                {{ child.meta.title }}
                <i class="el-icon-caret-right" />
              </span>
              <!-- 三级菜单-->
              <ul v-if="child.children.length" class="ct-menu-grand">
                <router-link
                  v-for="grand in child.children"
                  :key="grand.id"
                  :to="{ path: grand.path }"
                  tag="li"
                >
                  <!-- @click.native="menuClick(item)" -->
                  <span>{{ grand.meta.title }}</span>
                </router-link>
              </ul>
              <router-link
                v-else
                :key="child.id"
                :to="{ path: child.path }"
                tag="li"
              >
                <!-- @click.native="menuClick(item)" -->
                {{ child.meta.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <div class="clear-float" />
    </div>
    <el-tabs
      v-if="openTab.length"
      v-model="activeIndex"
      type="border-card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="item in openTab"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.closable"
      >
        <slot v-if="activeIndex === item.path" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { EventBus } from '../../../src/event-bus'
export default {
  name: 'CtTopNavigator',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: localStorage.getItem('CURRENT'),
      allData: this.$store.state.router.menus,
      // 所有打开的路由
      allTabs: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          title: '首页',
          query: {},
          matched: [],
          closable: false
        }
      ],
      // 当前展示的路由
      nowRoute: '/dashboard',
      menuArray: []
    }
  },
  computed: {
    openTab: function() {
      return this.allTabs
    },
    activeIndex: {
      get() {
        return this.nowRoute
      },
      set(val) {
        this.set_active_index(val)
      }
    }
  },
  watch: {
    $route(to, from) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = this.setSameLevelTab(to)
      if (!flag) {
        for (const item of this.openTab) {
          if (item.name === to.name) {
            this.set_active_index(to.path)
            flag = true
            break
          }
        }
        if (!flag) {
          if (this.isMenu(to)) {
            this.add_tabs({
              path: to.path,
              name: to.name,
              title: to.meta.title,
              query: this.filterQuery(to.query),
              matched: to.matched,
              closable: true
            })
            this.set_active_index(to.path)
          }
        }
      }
    }
  },
  mounted() {
    this.filterData(this.data)
    localStorage.setItem('ADD_TABS', JSON.stringify(this.allTabs))
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/' && this.$route.path !== '/dashboard') {
      this.add_tabs({
        path: this.$route.path,
        name: this.$route.name,
        title: this.$route.meta.title,
        query: this.filterQuery(this.$route.query),
        matched: this.$route.matched,
        closable: true
      })
      this.set_active_index(this.$route.path)
    } else {
      this.set_active_index('/dashboard')
      this.$router.push('/dashboard')
      // document.getElementsByClassName('el-aside')[0].style.display = 'none'
    }
  },
  methods: {
    // 过滤路由query，去除routerEncrypted属性
    filterQuery(query) {
      const newQuery = {}
      const keys = Object.keys(query)
      for (const key of keys) {
        if (key !== 'routerEncrypted') {
          newQuery[key] = query[key]
        }
      }
      return newQuery
    },
    // 是否菜单
    isMenu(to) {
      return this.menuArray.includes(to.path)
    },
    // 判断前选项卡对应的匹配路由中与将要跳转的路由的匹配路由是否有除了""和"/"之外的相同项，
    // 如果是，就说明他们是同一父路由下的同级路由，则不生成新的选项卡，而是将当前选项卡的参数替换为该页面，并返回true
    // 若非同级，则返回false
    setSameLevelTab(to) {
      if (this.activeIndex !== '/dashboard') {
        for (const tab of this.allTabs) {
          if (tab.path === this.activeIndex) {
            for (const tabMatched of tab.matched) {
              for (const toMatched of to.matched) {
                if (
                  toMatched.path !== '' &&
                  toMatched.path !== '/' &&
                  tabMatched.path === toMatched.path
                ) {
                  tab.path = to.path
                  tab.name = to.name
                  tab.title = to.meta.title
                  tab.query = this.filterQuery(to.query)
                  tab.matched = to.matched
                  this.set_active_index(to.path)
                  return true
                }
              }
            }
            return false
          }
        }
      }
      return false
    },
    filterData(menus) {
      for (const item of menus) {
        this.menuArray.push(item.path)
        if (item.children && item.children.length) {
          this.filterData(item.children)
        }
      }
    },
    // 添加tabs
    add_tabs(data) {
      // debugger
      this.allTabs.push(data)
    },
    // 删除tabs
    delete_tabs(path) {
      let index = 0
      for (const tab of this.allTabs) {
        if (tab.path === path) {
          break
        }
        index++
      }
      this.allTabs.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index(index) {
      this.nowRoute = index
    },
    // tab标签点击时，切换相应的路由
    tabClick(tab) {
      let query = {}
      for (const tab of this.allTabs) {
        if (tab.path === this.activeIndex) {
          query = tab.query
        }
      }
      this.$router.push({ path: this.activeIndex, query: query })
    },
    // 移除tab标签
    tabRemove(targetName) {
      this.current = 999
      localStorage.setItem('ACTIVE_PATH', '')
      this.delete_tabs(targetName)
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          this.set_active_index(this.openTab[this.openTab.length - 1].path)
          this.$router.push({
            path: this.activeIndex,
            query: this.openTab[this.openTab.length - 1].query
          })
        } else {
          this.$router.push({ path: '/dashboard' })
        }
      }
    },
    changeRouter(title) {
      this.tabRemove(localStorage.getItem('ACTIVE_PATH'))
      // document.getElementsByClassName('el-aside')[0].style.display = 'block'
      // document.getElementsByClassName('el-aside')[0].style.width = '200px'
      // if (document.getElementsByClassName('verticalMenu')[0]) {
      //   document.getElementsByClassName('verticalMenu')[0].parentNode.style.display = 'none'
      // }
      this.allData.forEach((item, index) => {
        if (title === item.meta.title) {
          // that.$store.commit('SET_CHANGE_ROUTERS', this.allData[index])
          localStorage.setItem(
            'SET_CHANGE_ROUTERS',
            JSON.stringify(this.allData[index])
          )
          EventBus.$emit('SET_CHANGE_ROUTERS', this.allData[index])
        }
      })
    },
    doActive(index) {
      this.current = index
      localStorage.setItem('CURRENT', this.current)
    }
  }
}
</script>
<style scoped>
.activeChange {
  background-color: #013786;
}
.unactive {
  background: #1d5fbd;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
/* 最大的DIV */
.ct-menu {
  /* width:100%; */
  /* margin: 30px auto; */
  background: #1d5fbd;
  position: relative;
  z-index: 99;
}
/* 一级ul */
.ct-menu-sub {
  /* width:100%; */
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  /* display: flex; */
}
.ct-menu-sub > li:hover {
  background-color: #013786;
}
.ct-menu-sub > li {
  position: relative;
  float: left;
}
/* 一级菜单的第一个li单独设置右边框 */
.ct-menu-sub > li:last-child {
  border-right: none;
  /* border-left:1px solid rgba(52,174,238); */
}
.ct-menu-sub > li:first-child {
  border-right: 1px solid rgb(8, 27, 141);
  /* border-left:none; */
}
/* 给一级菜单第二个li后面加左右边框 */
.ct-menu-sub > li + li {
  border-left: 1px solid rgb(52, 174, 238);
  border-right: 1px solid rgb(8, 27, 141);
}
.ct-menu-sub > li > span {
  padding: 0 7px;
  /* font-size: 16px;
    line-height: 40px;
    height: 40px; */
  color: #fff;
}
.ct-menu-sub > li > span > img {
  font-size: 0;
  width: 12px;
  height: 10px;
  vertical-align: middle;
}
.ct-menu-child {
  border-radius: 50%;
  display: none;
  background-color: #013786;
  position: absolute;
}
.ct-menu-sub > li:hover > .ct-menu-child {
  display: block;
}

/* 1级菜单的最后一个li下面三级菜单靠左显示 */
.ct-menu-sub > li:last-child > .ct-menu-grand {
  position: absolute;
  top: 0;
  left: -100%;
}
.ct-menu-child > li {
  width: 160px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  background-color: #013786;
  color: #fff;
  position: relative;
  text-align: left;
  padding-left: 10px;
}
.ct-menu-child > li:hover {
  cursor: pointer;
  background: #ffbd21;
  color: #000;
}
.ct-menu-child > li > span > img {
  font-size: 0;
  width: 10px;
  height: 12px;
  padding: 8px 8px;
  float: right;
}
/* .white{
      display: inline-block;
      display: block;
    } */
.black {
  display: none;
}
.ct-menu-child > li:hover .white {
  display: none;
}
.ct-menu-child > li:hover .black {
  display: block;
}
/* 二级菜单的第一个li单独设置下边框 */
.ct-menu-child > li:nth-child(1) {
  border-bottom: 1px solid rgba(1, 33, 86);
}
.ct-menu-grand > li:nth-child(1) {
  border-bottom: 1px solid rgba(1, 33, 86);
}
/* 给第二个li后面加上下边框 */
.ct-menu-child li + li {
  border-top: 1px solid rgba(1, 77, 182);
  border-bottom: 1px solid rgba(1, 33, 86);
}
/* 二级的li划入出现3级的ul */
.ct-menu-child > li:hover > .ct-menu-grand {
  display: block;
}

/* 3级的ul的li的效果 */
.ct-menu-grand > li {
  width: 160px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  background-color: #013786;
  color: #fff;
  text-align: left;
  padding-left: 10px;
}
/* 3级的ul的li划入的效果 */
.ct-menu-grand > li:hover {
  background: rgb(255, 189, 33);
  color: #000;
}
/* 一级菜单的最后一个li的三级菜单在左边 */

.ct-menu-grand {
  left: 100%;
  top: 0;
  position: absolute;
  display: none;
}
.clear-float {
  clear: both;
}
</style>
