<template>
  <div class="rank">
    <ScrollView v-show="movieList.length" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie._id"
        :movie="movie"
        :sort="index + 1"
        @select="gotoDetail"
      />
    </ScrollView>
    <div v-show="!movieList.length" class="loading-wrap">
      <Loading/>
    </div>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
import axios from 'axios'
export default {
  data () {
    return {
      movieList: []
    }
  },
  components: {
    Card,
    Loading,
    ScrollView
  },
  created () {
    this.getMovieList()
  },
  methods: {
    getMovieList () {
      axios.get('/api/api/movie/get_rank').then(res => {
        // console.log(res);
        if (res.data.code === 1001) {
          this.movieList = this.movieList.concat(res.data.result.movies)
        }
      })
    },
    gotoDetail (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank
  height 100%
  .loading-wrap
    display flex
    align-items center
    height 100%
</style>