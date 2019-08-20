<template>
<!-- 电影列表 -->
  <section class="listBlock">
    <div class="info">
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="list" v-if="movies.length">
      <div class="item" v-for="item in movies" :key="item._id" @click="$emit('select', item._id)">
        <div class="image">
          <img v-lazy="item.poster" width="100%" height="100%">
          <em v-if="item.isPlay === 1" class="rate">
            {{item.rate}}
          </em>
        </div>
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <div v-else class="loading-wrap">
      <Loading />
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading'
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
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
.listBlock
  padding 15px
  min-height 100px
  text-align center
  .info
    display flex
    justify-content space-between
    margin-bottom 15px
    font-weight bold
    font-size 20px
  .list
    display flex
    justify-content space-between
    flex-wrap wrap
    .item
      width 24%
      .image
        position relative
        height 80%
        .rate
          position absolute
          right 5px
          bottom 2px
          color #ffb400
          font-weight bold
          font-style italic
      .title
        padding: 10px 0
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-size 14px
  .loading-wrap
    display flex
    align-items center
    height 200px
</style>