import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    booksApiDomain: 'https://demo.api-platform.com/books/',
    books: [],
    booksLoaded: 6,
    detailId: '',
  },
  getters: {
    loadedBooks(state) {
      return state.books.slice(0, state.booksLoaded)
    },
    loadedToEnd(state) {
      return state.books.length <= state.booksLoaded
    },
    bookDetail(state) {
      return state.books.filter(book => book['@id'] === state.detailId)[0]
    }
  },
  mutations: {
    UPDATE_BOOKS(state, payload) {
      let books = payload.books
      state.books = [...state.books, ...books]
    },
    RESET_LOAD_BOOKS(state) {
      state.booksLoaded = 6
    },
    LOAD_BOOKS(state) {
      if(!this.getters.loadedToEnd) state.booksLoaded += 6
    },
    SET_DETAIL_ID(state, payload) {
      let id = payload.id
      state.detailId = id
    }
  },
  actions: {
    requestBooks({ commit, state }) {
      if(!state.books.length){
        axios.get(state.booksApiDomain)
        .then(res => {
          let books = res.data['hydra:member']
          commit('UPDATE_BOOKS', {
            books
          })
        })
        .catch(e => alert(e))
      }
    }
  }
})
