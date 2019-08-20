import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/views/Recommend'
import Rank from '@/views/Rank'
import Search from '@/views/Search'
import Category from '@/views/Category'
import Movie from '@/views/Movie'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path:'/search',
      name:'Search',
      component: Search
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie
    }
  ]
})
