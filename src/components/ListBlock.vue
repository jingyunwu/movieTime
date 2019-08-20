<template>
<!-- 电影列表 -->
  <section class="listBlock">
    <div class="info">
      <h1 class="title">{{title}}</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true //该数据类型的数据是否符合其规定
    },
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.listBlock
  padding 15px
  min-height 100px
  text-align center
</style>