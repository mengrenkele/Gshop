<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <button class="btn1">我是按钮</button>
    <button class="btn2">你是安牛</button>
    <ul>
      <li @click=" handleClick (item) " :class="{active: navIndex === item}" v-for="item in 10" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app',
  data (){
    return {
      msg: 'hello',
      navIndex: 1
    }
  },
  methods: {
    handleClick (item) {
      this.navIndex= item
    }
  },
}
</script>

<style lang="stylus">
//引入文件
@import "./common/stylus/mixins.styl"

//定义变量
  $color = red
  //定义混合
  btnstyle(w,h,bg)
    width w
    height h
    background bg
  //定义函数
  add(a,b)
    padding a+b
  

  h2
    color $color
  
  .btn1
    btnstyle(100px,100px,#864638)
    add(25px,25)
    box-sizing content-box
    border none
  .btn2
    btnstyle(200px,200px,#5d8f9e)
  ul
    li
      line-height 40px
      &.active
        color $yellow  

</style>
