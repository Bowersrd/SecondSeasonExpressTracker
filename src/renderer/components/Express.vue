<template>
  <div id="wrapper">
    <CoinToss :logoAway="awayLogo" :logoHome="midfield" :home="homeTeam.mascot" :away="awayTeam.mascot"  />
    <ExtraPoint :logoAway="awayLogo" :logoHome="midfield" :home="homeTeam.mascot" :away="awayTeam.mascot"  />
    <EndGame :logoAway="awayLogo" :logoHome="midfield" :home="homeTeam.mascot" :away="awayTeam.mascot" />
    <GameControl :class="{ active : homeBall }" :side="awayTeam.mascot" :opp="homeTeam.mascot" :logo="awayLogo" :teamColor="awayTeam.color" :ball="!homeBall" />
    <GameRecap />
    <div class="container">
      <Scoreboard />
      <div class="field">
        <img id="midfield" width="70px" :src="midfield" alt="Team Logo">
        <img id="football" src="../assets/football.png" alt="Football" :style="{left: zone}">
      </div>
      <Tracker :logoAway="awayLogo" :logoHome="midfield" />
    </div>
    <GameControl :class="{ active : !homeBall }" :side="homeTeam.mascot" :opp="awayTeam.mascot" :logo="midfield" :teamColor="homeTeam.color" :ball="homeBall" />
  </div>
</template>

<script>
import Scoreboard from './express/Scoreboard'
import Tracker from './express/Tracker'
import GameControl from './express/GameControl'
import CoinToss from './modals/CoinToss'
import ExtraPoint from './modals/ExtraPoint'
import EndGame from './modals/EndGame'
import GameRecap from './modals/GameRecap'

  export default {
    name: 'express',
    components: {
      Scoreboard,
      Tracker,
      GameControl,
      CoinToss,
      ExtraPoint,
      EndGame,
      GameRecap
    },
    data: () => {
      return {
        coinCalled: true,
        coinWin: false
      }
    },
    methods: {
      reset: function(){
        this.$store.dispatch('resetGameState')
      },
      score: function(){
        this.$store.dispatch('awayScore')
      },
      advance: function(){
        this.$store.dispatch('addZone')
      }
    },
    computed: {
        awayTeam () {
            return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.awayTeam)
        },
        homeTeam () {
            return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.homeTeam)
        },
        midfield () {
          const path = require('path')
          let team = this.homeTeam

          if (team.logo.includes('/logos/')) {
            return path.join(__static, team.logo)
          } else {
            return team.logo
          }
        },
        awayLogo () {
          const path = require('path')
          let team = this.awayTeam

          if (team.logo.includes('/logos/')) {
            return path.join(__static, team.logo)
          } else {
            return team.logo
          }
        },
        zone () {
          return this.$store.state.game.zones[this.$store.state.game.currentZone]
        },
        poss () {
          return this.$store.state.game.possession
        },
        homeBall () {
          return this.$store.state.game.homeBall
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
  overflow: hidden;
}

.container{
  align-items: center;
  @media screen and (max-width: 1599px) {
    width: 53%
  }
}

.field{
  width: 100%;
  height: 425px;
  background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.25), rgba(0,0,0,0), rgba(0,0,0,0.25), rgba(0,0,0,1)), url('../assets/field.png');
  background-position: center;
  background-size: contain;
  position: relative;
}

#midfield{
  position: absolute;
  top: 42%;
  left: 46.5%;
  @media screen and (max-width: 1599px) {
    top: 38%;
    left: 45%;
  }
}

#football{
  position: absolute;
  width: 45px;
  top: 47%;
  left: 0;
  transition: left 1.25s ease;
  @media screen and (max-width: 1599px) {
    top: 46.5%;
    width: 35px;
  }
}

.container, .btn-container{
  display: flex;
  flex-direction: column;
  text-align: center;
}

.title{
  position: relative;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 3.5rem;
  color: $white;
  margin-bottom: 25px;
  animation: text-slide-in 2.5s ease-out;
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
}

.active{
  opacity: 0.65;
  pointer-events: none;
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
