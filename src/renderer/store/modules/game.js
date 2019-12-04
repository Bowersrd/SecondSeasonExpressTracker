import Vue from 'vue'

const getDefaultState = () => {
  return {
    awayTeam: 0,
    homeTeam: 0,
    zones: ['2%','11%','19%','29%','42%','54%','67%','77%','85%','93%'],
    currentZone: 0,
    quarter: 1,
    time: 15,
    timeHalf: false,
    awayScores: [0, 0, 0, 0, 0],
    homeScores: [0, 0, 0, 0, 0],
    isTouchdown: false,
    homeBall: false,
    isHalftime: false,
    isOvertime: false,
    coinToss: true,
    ballFirst: '',
    gameEnd: false,
    gameRecap: false
  }
}

// Initial State
const state = getDefaultState()

  const getters = {
    awayTotal: (state) => {
      const add = (a, b) => a + b
      return state.awayScores.reduce(add)
    },
    homeTotal: (state) => {
      const add = (a, b) => a + b
      return state.homeScores.reduce(add)
    }
  }
  
  const mutations = {
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
    GET_AWAYTEAM: (state, payload) => {
      state.awayTeam = payload.id
    },
    GET_HOMETEAM: (state, payload) => {
      state.homeTeam = payload.id
    },
    SET_COIN_TOSS: (state, value) => {
      state.coinToss = false
      if (state.isOvertime) {
        if (value) {
          state.homeBall = true
        } else {
          state.homeBall = false
        }
      } else {
        if (value) {
          state.homeBall = false
          state.ballFirst = 'home'
        } else {
          state.homeBall = true
          state.ballFirst = 'away'
        }
      }
    },
    SET_TIME: (state) => {
      let awayTotal = state.awayScores.reduce((a, b) => a + b)
      let homeTotal = state.homeScores.reduce((a, b) => a + b)

      if (state.time < 3 && state.quarter == 2 || state.time < 3 && state.quarter == 4 || state.time < 3 && state.quarter == 5) {
        if (state.time == 1 && state.timeHalf) {
          // Skip Count
        } else if (state.time == 0 && state.timeHalf) {
          state.time = 0
        } else {
          state.time -= 1
        }
        state.timeHalf = !state.timeHalf
        if (state.time == 0 && state.quarter == 2) {
          if (state.timeHalf) {
            // Skip Count
          } else {
            state.isHalftime = true
          }
        } else if (state.time == 0 && state.quarter == 4) {
          if (state.timeHalf) {
            // Skip Count
          } else {
            if (awayTotal == homeTotal) {
              // Send to Overtime
              state.isOvertime = true
              state.coinToss = true
              state.time = 10
              state.quarter++
              state.currentZone = 0
            } else {
              state.time = 0
              state.gameEnd = true
            }
          }
        } else if (state.time == 0 && state.quarter == 5) {
          if (state.timeHalf) {
            // Skip Count
          } else {
            state.time = 0
            state.gameEnd = true
          }
        }
      } else {
        if (state.time < 2) {
          state.time = 15
          state.quarter++
        } else {
          state.time--
        }
      }
    },
    KO_ZONE: (state, value) => {
      let aScore = state.awayScores[state.quarter - 1] + 6
      let hScore = state.homeScores[state.quarter - 1] + 6

      if (value == 'Touchdown') {
        value = 9
      } else if (value == "Touchback") {
        value = 3
        if (state.time < 2 && state.quarter == 2 || state.time < 2 && state.quarter == 4 || state.time < 2 && state.quarter == 5) {
          state.time += 0.5
        } else {
          state.time++
        }
      }

      if (state.homeBall){
        if (state.currentZone += value > 8) {
          Vue.set(state.awayScores, state.quarter - 1, aScore)
          state.isTouchdown = true
          state.currentZone = 0
        } else {
          state.currentZone = state.currentZone + value
        }
      } else {
        if ((state.currentZone += (9 - value)) < 1) {
          Vue.set(state.homeScores, state.quarter - 1, hScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      }
          state.homeBall = !state.homeBall
    },
    OFF_ZONE: (state, value) => {
      let aScore = state.awayScores[state.quarter - 1] + 6
      let hScore = state.homeScores[state.quarter - 1] + 6
      
      if (state.homeBall) {
        state.currentZone -= value
        if (state.currentZone < 1) {
          Vue.set(state.homeScores, state.quarter - 1, hScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      } else {
        state.currentZone += value
        if (state.currentZone > 8) {
          Vue.set(state.awayScores, state.quarter - 1, aScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      }
    },
    SACK: (state) => {
      if (state.homeBall) {
        if (state.currentZone < 5) {
          state.currentZone++
        }
      } else {
        if (state.currentZone > 4) {
          state.currentZone--
      }
    }
  },
    FIELD_GOAL_GOOD: (state) => {
      let aScore = state.awayScores[state.quarter - 1] + 3
      let hScore = state.homeScores[state.quarter - 1] + 3

      if (state.homeBall) {
          Vue.set(state.homeScores, state.quarter - 1, hScore)
          state.currentZone = 0  
      } else {
          Vue.set(state.awayScores, state.quarter - 1, aScore)
          state.currentZone = 0
      }
    },
    CHANGE_POSS: (state) => {
      state.homeBall = !state.homeBall
    },
    PUNT_ZONE: (state, value) => {
      let aScore = state.awayScores[state.quarter - 1] + 6
      let hScore = state.homeScores[state.quarter - 1] + 6

      if (value == 'Block') {
        value = 0
      } else if (value == 'Touchdown') {
        value = 9
      }

      if (state.homeBall) {
        state.currentZone -= value
        state.homeBall = false
        if (state.currentZone < 1 && value != 9) {
          state.currentZone = 2 // Touchback for Away Team
        } else if (state.currentZone < 1) {
          Vue.set(state.awayScores, state.quarter - 1, aScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      } else {
        state.currentZone += value
        state.homeBall = true
        if (state.currentZone > 8 && value != 9) {
          state.currentZone = 7 // Touchback for Home Team
        } else if (state.currentZone > 8) {
          Vue.set(state.homeScores, state.quarter - 1, hScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      }
    },
    TURNOVER: (state, value) => {
      let aScore = state.awayScores[state.quarter - 1] + 6
      let hScore = state.homeScores[state.quarter - 1] + 6

      if (value == 'Touchdown') {
        value = -9
      }

      if (state.homeBall) {
        state.currentZone -= value
        state.homeBall = false
        if (state.currentZone > 8) {
          Vue.set(state.awayScores, state.quarter - 1, aScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      } else {
        state.currentZone += value
        state.homeBall = true
        if (state.currentZone < 1) {
          Vue.set(state.homeScores, state.quarter - 1, hScore)
          state.isTouchdown = true
          state.currentZone = 0
        }
      }
    },
    PENALTY: (state, value) => {
      if (state.homeBall) {
        state.currentZone -= value
        if (state.currentZone < 1) {
          state.currentZone = 1
        }
      } else {
        state.currentZone += value
        if (state.currentZone > 8) {
          state.currentZone = 8
        }
      }
    },
    EXTRA_POINT: (state, value) => {
      let aScore = state.awayScores[state.quarter - 1] + 1
      let hScore = state.homeScores[state.quarter - 1] + 1
      let aScoreAdj = state.awayScores[state.quarter - 2] + 1
      let hScoreAdj = state.homeScores[state.quarter - 2] + 1

      if (state.homeBall) {
        if (value == 'Good') {
          if (state.time == 15) {
            Vue.set(state.homeScores, state.quarter - 2, hScoreAdj)  
          } else {
            Vue.set(state.homeScores, state.quarter - 1, hScore)
          }
        } else {
          // XP is Missed -- Leave for Drive Setter
        }
      } else {
        if (value == 'Good') {
          if (state.time == 15) {
            Vue.set(state.awayScores, state.quarter - 2, aScoreAdj)  
          } else {
            Vue.set(state.awayScores, state.quarter - 1, aScore)  
          }
        } else {
          // XP is Missed -- Leave for Drive Setter
        }
      }
      state.isTouchdown = false
    },
    TOGGLE_RECAP: (state) => {
      state.gameRecap = !state.gameRecap
    },
    END_HALFTIME: (state) => {
      if (state.ballFirst == 'home') {
        state.homeBall = true
      } else {
        state.homeBall = false
      }
      state.time = 15
      state.quarter = 3
      state.currentZone = 0
      state.isHalftime = false
    },
    END_OVERTIME: (state) => {
      state.gameEnd = true
    }
  }
  
  const actions = {
    resetGameState ({ commit }) {
      commit('RESET_STATE')
    },
    getAwayTeam ({ commit }, payload) {
      commit('GET_AWAYTEAM', payload)
    },
    getHomeTeam ({ commit }, payload) {
      commit('GET_HOMETEAM', payload)
    },
    setCoinToss ({ commit }, value) {
      commit('SET_COIN_TOSS', value)
    },
    setTime ({ commit }) {
      commit('SET_TIME')
    },
    koZone ({ commit }, value) {
      commit('KO_ZONE', value)
    },
    offZone ({ commit }, value) {
      commit('OFF_ZONE', value)
    },
    sack ({ commit }) {
      commit('SACK')
    },
    fieldGoal ({ commit }) {
      commit('FIELD_GOAL_GOOD')
    },
    changePoss ({ commit }) {
      commit('CHANGE_POSS')
    },
    puntBall ({ commit }, value) {
      commit('PUNT_ZONE', value)
    },
    turnover ({ commit }, value) {
      commit('TURNOVER', value)
    },
    penalty ({ commit }, value) {
      commit('PENALTY', value)
    },
    extraPoint ({ commit }, value) {
      commit('EXTRA_POINT', value)
    },
    toggleRecap ({ commit }) {
      commit('TOGGLE_RECAP')
    },
    endHalftime ({ commit }) {
      commit('END_HALFTIME')
    },
    endOvertime ({ commit }) {
      commit('END_OVERTIME')
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  