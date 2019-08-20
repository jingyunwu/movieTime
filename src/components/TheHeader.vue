<template>
  <div class="header">
    <!-- 图标 -->
    <div class="logo">
      <i class="back"></i>
    </div>
    <!-- tab -->
    <div class="tables">
      <div class="item">
        <Router-link to="/recommend">首页</Router-link>
      </div>
      <div class="item">
        <Router-link to="/category">分类</Router-link>
      </div>
      <div class="item">
        <Router-link to="/rank">榜单</Router-link>
      </div>
      <div class="item">
        <Router-link to="/search">搜索</Router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    display flex
    z-index 100
    width 100%
    height 56px
    line-height 56px
    color #bbbbbb
    background #1c2635
    .logo
      width 25%
      padding 15px
      box-sizing border-box
      .back
        display block
        height 100%
        background url('../common/images/logo.png') no-repeat center
        background-size contain
    .tables
      display flex
      flex 1
      font-size 17px 
      .item
        flex 1
        justify-content center
        a
          height 56px
          color #bbbbbb
          display inline-block
          box-sizing border-box
    .router-link-active
      font-weight: 700
      color #fff!important
      border-bottom: 3px solid #fff      
</style>