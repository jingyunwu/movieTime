import Vue from 'vue'
import Vuex from 'vuex'
import { getSearch, saveSearch, deleteSearch, clearSearch } from '@/common/js/cache'

Vue.use(Vuex)

let state = {
  searchHistory: getSearch()
}

let mutations = {
  saveSearchHistory(state, query) {
    state.searchHistory = saveSearch(query)
  },
  deleteSearchHistory(state, query) {
    state.searchHistory = deleteSearch(query)
  },
  clearSearchHistory (state) {
    state.searchHistory = clearSearch()
  }
}


export default new Vuex.Store({
  state,
  mutations
})