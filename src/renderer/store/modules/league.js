const getDefaultState = () => {
  return {
    teams: [
        {id: 0, city: 'Arizona', mascot: 'Cardinals', abbrev: 'ARI', color: '#97233F', isFav: false, logo: `/logos/ari.png`},
        {id: 1, city: 'Atlanta', mascot: 'Falcons', abbrev: 'ATL', color: '#A71930', isFav: false, logo: `/logos/atl.png`},
        {id: 2, city: 'Baltimore', mascot: 'Ravens', abbrev: 'BAL', color: '#241773', isFav: false, logo: `/logos/bal.png`},
        {id: 3, city: 'Buffalo', mascot: 'Bills', abbrev: 'BUF', color: '#00338D', isFav: false, logo: `/logos/buf.png`},
        {id: 4, city: 'Carolina', mascot: 'Panthers', abbrev: 'CAR', color: '#0085CA', isFav: false, logo: `/logos/car.png`},
        {id: 5, city: 'Chicago', mascot: 'Bears', abbrev: 'CHI', color: '#0B162A', isFav: false, logo: `/logos/chi.png`},
        {id: 6, city: 'Cincinnati', mascot: 'Bengals', abbrev: 'CIN', color: '#FB4F14', isFav: false, logo: `/logos/cin.png`},
        {id: 7, city: 'Cleveland', mascot: 'Browns', abbrev: 'CLE', color: '#FF3C00', isFav: false, logo: `/logos/cle.png`},
        {id: 8, city: 'Dallas', mascot: 'Cowboys', abbrev: 'DAL', color: '#041E42', isFav: false, logo: `/logos/dal.png`},
        {id: 9, city: 'Denver', mascot: 'Broncos', abbrev: 'DEN', color: '#FB4F14', isFav: false, logo: `/logos/den.png`},
        {id: 10, city: 'Detroit', mascot: 'Lions', abbrev: 'DET', color: '#0076B6', isFav: false, logo: `/logos/det.png`},
        {id: 11, city: 'Green Bay', mascot: 'Packers', abbrev: 'GB', color: '#203731', isFav: false, logo: `/logos/gb.png`},
        {id: 12, city: 'Houston', mascot: 'Texans', abbrev: 'HOU', color: '#03202F', isFav: false, logo: `/logos/hou.png`},
        {id: 13, city: 'Indianapolis', mascot: 'Colts', abbrev: 'IND', color: '#002C5F', isFav: true, logo: `/logos/ind.png`},
        {id: 14, city: 'Jacksonville', mascot: 'Jaguars', abbrev: 'JAC', color: '#006778', isFav: false, logo: `/logos/jac.png`},
        {id: 15, city: 'Kansas City', mascot: 'Chiefs', abbrev: 'KC', color: '#E31837', isFav: false, logo: `/logos/kc.png`},
        {id: 16, city: 'Los Angeles', mascot: 'Chargers', abbrev: 'LAC', color: '#002A5E', isFav: false, logo: `/logos/lac.png`},
        {id: 17, city: 'Los Angeles', mascot: 'Rams', abbrev: 'LAR', color: '#002244', isFav: false, logo: `/logos/lar.png`},
        {id: 18, city: 'Miami', mascot: 'Dolphins', abbrev: 'MIA', color: '#008E97', isFav: false, logo: `/logos/mia.png`},
        {id: 19, city: 'Minnesota', mascot: 'Vikings', abbrev: 'MIN', color: '#4F2683', isFav: false, logo: `/logos/min.png`},
        {id: 20, city: 'New England', mascot: 'Patriots', abbrev: 'NE', color: '#002244', isFav: false, logo: `/logos/ne.png`},
        {id: 21, city: 'New Orleans', mascot: 'Saints', abbrev: 'NO', color: '#D3BC8D', isFav: false, logo: `/logos/no.png`},
        {id: 22, city: 'New York', mascot: 'Giants', abbrev: 'NYG', color: '#0B2265', isFav: false, logo: `/logos/nyg.png`},
        {id: 23, city: 'New York', mascot: 'Jets', abbrev: 'NYJ', color: '#125740', isFav: false, logo: `/logos/nyj.png`},
        {id: 24, city: 'Oakland', mascot: 'Raiders', abbrev: 'OAK', color: '#A5ACAF', isFav: false, logo: `/logos/oak.png`},
        {id: 25, city: 'Philadelphia', mascot: 'Eagles', abbrev: 'PHI', color: '#004C54', isFav: false, logo: `/logos/phi.png`},
        {id: 26, city: 'Pittsburgh', mascot: 'Steelers', abbrev: 'PIT', color: '#FFB612', isFav: false, logo: `/logos/pit.png`},
        {id: 27, city: 'San Francisco', mascot: '49ers', abbrev: 'SF', color: '#AA0000', isFav: false, logo: `/logos/sf.png`},
        {id: 28, city: 'Seattle', mascot: 'Seahawks', abbrev: 'SEA', color: '#002244', isFav: false, logo: `/logos/sea.png`},
        {id: 29, city: 'Tampa Bay', mascot: 'Buccaneers', abbrev: 'TB', color: '#D50A0A', isFav: false, logo: `/logos/tb.png`},
        {id: 30, city: 'Tennessee', mascot: 'Titans', abbrev: 'TEN', color: '#0C2340', isFav: false, logo: `/logos/ten.png`},
        {id: 31, city: 'Washington', mascot: 'Redskins', abbrev: 'WAS', color: '#773141', isFav: false, logo: `/logos/was.png`}
    ]
  }
}

// Initial State
const state = getDefaultState()

const getters = {
  favTeam: (state) => {
    return state.teams.find(team => team.isFav).id
  },
  // sortedTeams: (state) => {
  //   const sortTeams = [...state.teams].sort((a, b) => (a.city > b.city) ? 1 : -1)
  //   return sortTeams
  // }
}
  
const mutations = {
  RESET_TEAMS: (state) => {
    Object.assign(state, getDefaultState())
  },
  SORT_TEAMS: (state) => {
    state.teams.sort((a, b) => (a.city > b.city) ? 1 : -1)
  },
  UPDATE_CITY (state, { value, team }) {
    state.teams[team].city = value
  },
  UPDATE_MASCOT (state, { value, team }) {
    state.teams[team].mascot = value
  },
  UPDATE_COLOR (state, { value, team }) {
    state.teams[team].color = value
  },
  UPDATE_ABBREV (state, { value, team }) {
    state.teams[team].abbrev = value
  },
  UPDATE_LOGO (state, { value, team }) {
    state.teams[team].logo = value
  }
}
  
const actions = {
  resetTeams ({ commit }) {
    commit('RESET_TEAMS')
  },
  sortTeams ({ commit }) {
    commit('SORT_TEAMS')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
  