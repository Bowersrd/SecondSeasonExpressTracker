<template>
  <div id="wrapper">
    <div class="container">
      <h1 class="title">Team Settings</h1>
      <div class="team-container">
        <font-awesome-icon class="arrow" :icon="['fas', 'sort-up']" @click="prevTeam" />
        <img height="100%" :src="logo" alt="Team Logo" @click="changeLogo(team.id)">
        <form action="POST" id="team-details">
            <h2>Team Abbreviation</h2>
            <input type="text" v-model="teamAbbrev" :placeholder="team.abbrev">
            <h2>Team City</h2>
            <input type="text" v-model="teamCity" :placeholder="team.city">
            <h2>Team Mascot</h2>
            <input type="text" v-model="teamMascot" :placeholder="team.mascot">
            <h2>Team Color</h2>
            <input type="text" v-model="teamColor">
            <input type="color" v-model="teamColor"/>
            <div class="" id="fav-team-container">
              <input type="checkbox" id="favTeam" :checked="team.isFav" @change="changeFav(team.id)">
              <label for="favTeam">Favorite Team?</label>
            </div>
        </form>
        <font-awesome-icon class="arrow" :icon="['fas', 'sort-down']" @click="nextTeam" />
      </div>
      <div class="btn-container">
        <router-link :to="button.route" class="btn" v-for="button in buttons" :key="button.name" @click.native="sortTeams"> {{  button.name }} </router-link>
        <a href="#" class="btn" @click="resetTeams">Reset Teams</a>
        <a href="#" class="btn" @click="addTeam">Add Team</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start-screen',
    data: () => {
      return {
        buttons: [
          {name: 'Back', route: '/startscreen'}
        ],
        id: 0
      }
    },
    methods: {
        changeFav: function (id) {
          this.$store.dispatch('updateFav', id)
        },
        addTeam: function () {
          this.$store.dispatch('addTeam')
          this.id = this.$store.state.league.teams.length - 1
        },
        removeTeam: function (id) {
          this.$store.dispatch('removeTeam', id)
          if (id == 0) {
            this.id = 0
          } else {
            this.id = id - 1
          }
        },
        prevTeam: function () {
          let teams = this.$store.state.league.teams.length - 1
            if (this.id < 1){
                this.id = teams
            } else {
                this.id--
            }
        },
        nextTeam: function () {
          let teams = this.$store.state.league.teams.length - 2
            if (this.id > teams){
                this.id = 0
            } else {
                this.id++
            }
        },
        resetTeams: function () {
          this.id = 0
          this.$store.dispatch('resetTeams')
        },
        sortTeams: function () {
          this.$store.dispatch('sortTeams')
        },
        changeLogo: function (team) {
          const {dialog} = require('electron').remote
          const file = dialog.showOpenDialog({
            properties: ['openFile']
          })
          const value = file[0]
          this.$store.commit('UPDATE_LOGO', {value, team})

        }
    },
    computed: {
        team(){
            return this.$store.state.league.teams[this.id]
        },
        logo(){
            const path = require('path')
            if (this.$store.state.league.teams[this.id].logo.includes('/logos/')) {
              return path.join(__static, this.$store.state.league.teams[this.id].logo)
            } else {
              return this.$store.state.league.teams[this.id].logo
            }
        },
        teamCity: {
            get () {
                return this.$store.state.league.teams[this.id].city
            },
            set (value, id) {
                let team = this.id
                this.$store.commit('UPDATE_CITY', {value, team})
            }
        },
        teamMascot: {
            get () {
                return this.$store.state.league.teams[this.id].mascot
            },
            set (value, id) {
                let team = this.id
                this.$store.commit('UPDATE_MASCOT', {value, team})
            }
        },
        teamColor: {
            get () {
                return this.$store.state.league.teams[this.id].color
            },
            set (value, id) {
                let team = this.id
                this.$store.commit('UPDATE_COLOR', {value, team})
            }
        },
        teamAbbrev: {
            get () {
                return this.$store.state.league.teams[this.id].abbrev
            },
            set (value, id) {
                let team = this.id
                this.$store.commit('UPDATE_ABBREV', {value, team})
            }
        }
    }
  }
</script>

<style lang="scss" scoped>
$white: #ecf0f1;

#wrapper{
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.8)), url('../assets/background.png');
  background-size: cover;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.container{
  display: flex;
  flex-direction: column;
  text-align: center;
  @media screen and (max-width: 1599px) {
    margin-top: 60px;
  }
}

.btn-container{
  display: flex;
  @media screen and (max-width: 1599px) {
    margin-top: 60px;
  }
}

.title{
  position: relative;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 3.5rem;
  color: $white;
  margin-bottom: 25px;
  @media screen and (max-width: 1599px) {
    font-size: 3rem;
    top: -70px;
  }
}

.btn{
  width: 200px;
  height: 50px;
  padding: 15px 25px;
  outline: 1px solid $white;
  color: $white;
  text-decoration: none;
  margin: 10px auto;
  transition: all 0.4s ease-in-out;
  &:hover{
    background: $white;
    color: #000;
  }
  @media screen and (max-width: 1599px) {
    width: 150px;
    height: 40px;
    padding: 12px 20px;
  }
}

.team-container{
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    & img {
      cursor: pointer;
    }
    @media screen and (max-width: 1599px) {
    height: 300px;
  }
}

#team-details{
    display: flex;
    flex-direction: column;
    color: #fff;
    text-transform: uppercase;
    text-align: left;
    margin: 0 auto;
    input{
        width: 300px;
        height: 30px;
        background: transparent;
        border: 1px solid #ccc;
        margin: 10px 0;
        color: #fff;
        padding: 10px 15px;
    }
    input[type="color"]{
      width:100%;
      margin:0px;
      padding:0px;
      height:40px;
      cursor: pointer;
    }
}

.arrow{
    font-size: 4rem;
    color: #fff;
    transform: rotate(-90deg);
    cursor: pointer;
}

#fav-team-container {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  label {
    flex-basis: 200px;
    font-size: 1.4rem;
  }
  input {
    flex-basis: 70px;
  }
}

  // Keyframes

  @keyframes text-slide-in{
    0% { 
      opacity: 0;
      top: -1000px;
    }

    50% {
      opacity: 0;
    }

    100% { 
      opacity: 1;
      top: 0;
    }
  }

  @keyframes fade-in{
    0% { 
      opacity: 0;
    }

    100% { 
      opacity: 1;
    }
  }

</style>
