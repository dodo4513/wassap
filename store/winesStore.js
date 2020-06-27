import ServerConfig from "../server.config";
import Vue from 'vue'

export const state = () => ({
  keyword: '',
  wineList: []
})

export const mutations = {
  setWine(state, wines) {
    wines.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    wines.map((value, index) => {
      value.no = index + 1
      value.price = value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })
    Vue.set(state, 'wineList', wines);
  },
  setKeyword(state, keyword) {
    Vue.set(state, 'keyword', keyword);
  }
}
export const actions = {
  searchWine({state, commit}, keyword) {
    if (keyword == null || keyword.trim() === '') {
      return
    }
    keyword = keyword.trim()

    fetch(`${ServerConfig.url}/wines/${keyword}`)
    .then(res => res.json())
    .then(res => {
      this.keyword
      commit('setKeyword', keyword)
      commit('setWine', res)
    })
  }
}
