<template>
  <div class="recommend">
    <!-- 首页整个页面都支持better-scroll滚动 -->
    <ScrollView :data="movies">
      <ListBlock :movies="playingMovies" :title="`正在热映(${playingCount})`" @select="selectItem">
      </ListBlock>
      <div class="space" style="background-color: #f6f6f6;height: 10px"></div>
      <ListBlock :movies="commingMovies" :title="`即将上映(${commingCount})`" @select="selectItem">
      </ListBlock>
    </ScrollView>
  </div>
</template>

<script>
import axios from 'axios'
import ListBlock from '@/components/ListBlock'
import ScrollView from '@/components/ScrollView'
export default {
  data() {
    return {
      playingMovies: [], // 正在热映的电影
      playingCount:0,  // 正在热映电影的数量
      commingMovies:[], // 即将上映的电影
      commingCount:0  // 即将上映电影的数量
    }
  },
  components: {
    ListBlock,
    ScrollView
  },
  created() {
    this.getMovies()  // 请求放created()周期函数中较合适
  },
  computed: {
    movies () {
      return this.playingMovies.concat(this.commingMovies)
    }
  },
  methods: {
    getMovies() {
      axios.get('/api/api/movie/get_hot')
      .then(res => {
        // console.log(res)
        if (res.data.code === 1001) {
          const { comming, playing } = res.data.result
          this.playingMovies = playing.movies
          this.playingCount = playing.count
          this.commingMovies = comming.movies
          this.commingCount = comming.count
        }
      })
    },
    selectItem(id) {
      // console.log(id)
      this.$router.push(`/movie/${id}`) // 路由传参
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  height 100%
</style>