import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  show: false
})

export const mutations = {
  show(state, value) {
    state.show = value
  }
}