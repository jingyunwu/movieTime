<template>
  <div class="search">
    <ScrollView :data="list">
      <div class="input-wrap">
        <SearchBox ref="searchBox" @input="search" @clear="clear"></SearchBox>
      </div>
      <div class="hotkey-wrap">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span 
            v-for="item in hotKeys" :key="item._id"
            class="item"
            @click="addQuery(item.name)"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="history-wrap" v-if="searchHistory.length">
        <div class="title">
          <span>搜索历史</span>
          <i class="iconfont icon-clear" @click="showConfirm"></i>
        </div>
        <div class="item" v-for="item in searchHistory" :key="item">
          <span class="text" @click="addQuery(item)">{{ item }}</span>
          <i class="iconfont icon-del" @click="deleteSearchHistory(item)"></i>
        </div>
      </div>
    </ScrollView>
    <div class="result-wrap" v-show="isShow">
      <ScrollView :data="movieList">
        <Card v-for="movie in movieList" :key="movie._id" :movie="movie" @select="selectItem"></Card>
      </ScrollView>
      <div class="no-result" v-show="!movieList.length">
        <img src="../common/images/noresult.png" class="img" alt="">
        <p class="text">没有找到相关内容</p>
      </div>
    </div>
    <Confirm ref="confirm" content="是否删除所有搜索历史" @confirm="clearSearchHistory"></Confirm>
  </div>
</template>

<script>
import '../../iconfont/font_p1ci99rlir/iconfont.css'
import SearchBox from '@/components/SearchBox'
import ScrollView from '@/components/ScrollView'
import Card from '@/components/Card'
import Confirm from '@/components/Confirm'
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      movieList: [],
      isShow: false,
      hotKeys: []
    }
  },
  components: {
    SearchBox,
    ScrollView,
    Card,
    Confirm
  },
  computed: {
    list() {
      return this.hotKeys.concat(this.searchHistory)
    },
    ...mapState([
      'searchHistory'
    ])
  },
  created() {
    this.getHotKeys()
  },
  methods: {
    search(query) {
      // console.log(query)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!query.trim()) return
      const params = {
        keyword: query
      }
      this.timer = setTimeout(() => {
        axios.get('/api/api/movie/search', {params})
         .then(res => {
           // console.log(res)
           if (res.data.code === 1001) {
             this.movieList = res.data.result.movies
             this.isShow = true
           }
         })
         this.saveSearchHistory(query)
      }, 500)
    },
    clear() {
      this.movieList = []
      this.isShow = false
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    getHotKeys() {
      axios.get('/api/api/movie/get_hot_search').then(res => {
        // console.log(res)
        if (res.code === 1001) {
          this.hotKeys = res.data.result.keywords
        }
      })
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
      this.search(query)
    },
    selectItem(id) {
      this.$router.push(`/movie/${id}`)
    },
    ...mapMutations([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.search
  height 100%
  background #f9f9f9
  .input-wrap
    background #f5f5f5
    padding: 10px 15px
  .hotkey-wrap
    padding  0 0 8px 15px
    background-color #fff
    .title
      padding 15px 0
      font-size 15px
      color #666
    .list
      display flex
      flex-wrap wrap
      overflow hidden
      .item
        padding 6px 12px
        margin: 0 12px 12px 0
        border-radius 4px
        font-size 13px
        color #333
        background-color #f5f5f5
  .history-wrap
    .title
      padding 15px 0
      font-size 15px
      color #666
      .icon-clear
        float right
        font-size 15px
    margin-top 10px
    padding 0 15px 8px 15px
    .item
      height 40px
      line-height 40px
      display flex
      font-size 15px
      color #333
      border-bottom 1px solid #e5e5e5
      .iconfont
        font-size 15px
        color #999
      .text
        flex 1
  .result-wrap
    position fixed
    top 111px
    bottom 0
    width 100%
    overflow scroll
    background #fff
    .no-result
      position absolute
      top 40%
      left 50%
      transform translate(-50%,-50%)
      color #999
      text-align center
      .img
        width 100px
        height 100px
        filter grayscale(1)
        margin-bottom 15px
</style>