import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState } from 'vuex-electron'
import league from './modules/league'
import game from './modules/game'
import summary from './modules/summary'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    league,
    game,
    summary
  },
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
