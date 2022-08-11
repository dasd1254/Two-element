<template>
  <div class="ct-menu">
    <ul class="ct-menu-sub">
      <li v-for="item in data" :key="item.id">
        <span>
          {{ item.name }}
          <!-- unicode引用写法 -->
          <!-- <i class="iconfont" v-show="item.children.length">&#xe6b1;</i> -->
          <!-- font-class引用 -->
          <i v-show="item.children.length" class="iconfont iconxia-white" />
          <!-- <img src="../../../src/assets/sjx-bottom-w.png" alt="" v-show="item.children.length"> -->
        </span>
        <!-- 二级菜单 -->
        <ul class="ct-menu-child">
          <li v-for="child in item.children" :key="child.id">
            <span>
              {{ child.name }}
              <i
                v-show="child.children.length"
                class="iconfont iconyou-white"
              />
              <!-- <img src="../../../src/assets/sjx-right-w.png" alt="" class="white" v-show="child.children.length">
            <img src="../../../src/assets/sjx-right-b.png" alt="" class="black" v-show="child.children.length"> -->
            </span>
            <!-- 三级菜单-->
            <ul class="ct-menu-grand">
              <li v-for="grand in child.children" :key="grand.id">
                <span>{{ grand.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div class="overflow" />
  </div>
</template>
<script>
export default {
  name: 'CtMenu',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {}
}
</script>
<style scoped>
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
  /* overflow: hidden; */
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
.ct-menu-child > li > span > i {
  /* font-size: 0; */
  /* width: 10px;
    height: 12px;
    padding: 8px 8px; */
  float: right;
}
/* .white{
      display: inline-block;
      display: block;
    } */
/* .black{
      display: none;
    }
    .ct-menu-child>li:hover .white{
      display: none;
    }
     .ct-menu-child>li:hover .black{
       display: block;
     } */
/* 二级菜单的第一个li单独设置下边框 */
.ct-menu-child li:nth-child(1) {
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
.overflow {
  clear: both;
}
</style>
