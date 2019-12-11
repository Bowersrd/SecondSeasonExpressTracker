<template>
    <div id="scoreboard-wrapper">
        <div class="info-bar">
            <div class="team-name" :style="`backgroundColor: ${awayTeam.color}`">
              <p class="name">{{ awayTeam.city }}</p>
            </div>
            <div id="clock">
              <p v-show="!gameEnd && !isHalftime">{{ timeRemain }}:<span v-show="!timeHalf">00</span><span v-show="timeHalf">30</span> - {{ quarter }} <span v-show="!isOvertime">QUARTER</span></p>
              <p v-show="isHalftime">HALFTIME</p>
              <p v-show="gameEnd">FINAL</p>
            </div>
            <div class="team-name" :style="`backgroundColor: ${homeTeam.color}`">
              <p class="name">{{ homeTeam.city }}</p>
            </div>
        </div>
        <div class="scoreboard">
            <img id="awayPossession" src="../../assets/poss.png" alt="Away Possession" width="30px" v-if="!possession">
            <img id="homePossession" src="../../assets/poss.png" alt="Home Possession" width="30px" v-else>
            <div class="team-logo">
              <img :src="awayLogo" alt="Away Logo" width="90%">
            </div>
            <div class="score">
              <p id="awayScore">{{ awayTotalScore }}</p>
            </div>
            <div id="qtr-score">
              <div id="qtr-wrapper">
                  <div id="qtr">
                    <p class="qtr"></p>
                    <p class="qtr">1</p>
                    <p class="qtr">2</p>
                    <p class="qtr">3</p>
                    <p class="qtr">4</p>
                    <p class="qtr" v-show="isOvertime">OT</p>
                    <p class="qtr" v-show="gameEnd">F</p>
                  </div>
                  <div id="awayQtr">
                    <p class="qtr team"> {{ awayTeam.abbrev }} </p>
                    <p class="qtr">{{ awayQtrScore[0] }}</p>
                    <p class="qtr">{{ awayQtrScore[1] }}</p>
                    <p class="qtr">{{ awayQtrScore[2] }}</p>
                    <p class="qtr">{{ awayQtrScore[3] }}</p>
                    <p class="qtr" v-show="isOvertime">{{ awayQtrScore[4] }}</p>
                    <p class="qtr" v-show="gameEnd" :class="{win: awayTotalScore > homeTotalScore}">{{ awayTotalScore }}</p>
                  </div>
                  <div id="homeQtr">
                    <p class="qtr team"> {{ homeTeam.abbrev }} </p>
                    <p class="qtr">{{ homeQtrScore[0] }}</p>
                    <p class="qtr">{{ homeQtrScore[1] }}</p>
                    <p class="qtr">{{ homeQtrScore[2] }}</p>
                    <p class="qtr">{{ homeQtrScore[3] }}</p>
                    <p class="qtr" v-show="isOvertime">{{ homeQtrScore[4] }}</p>
                    <p class="qtr" v-show="gameEnd" :class="{win: awayTotalScore < homeTotalScore}">{{ homeTotalScore }}</p>
                  </div>
              </div>
            </div>
            <div class="score">
              <p id="homeScore"> {{ homeTotalScore }} </p>
            </div>
            <div class="team-logo">
            <img :src="homeLogo" alt="Home Logo" width="90%">
            </div>
        </div>
        <div class="bar"></div>
    </div>
</template>

<script>
export default {
  computed: {
    possession(){
      return this.$store.state.game.homeBall
    },
    awayTeam(){
      return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.awayTeam)
    },
    homeTeam(){
      return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.homeTeam)
    },
    awayLogo(){
      const path = require('path')
      let team = this.awayTeam
      
      if (team.logo.includes('/logos/')) {
        return path.join(__static, team.logo)
      } else {
        return team.logo
      }
    },
    homeLogo(){
      const path = require('path')
      let team = this.homeTeam
      if (team.logo.includes('/logos/')) {
        return path.join(__static, team.logo)
      } else {
        return team.logo
      }
    },
    awayTotalScore(){
      return this.$store.getters.awayTotal
    },
    homeTotalScore(){
      return this.$store.getters.homeTotal
    },
    awayQtrScore(){
      return this.$store.state.game.awayScores
    },
    homeQtrScore(){
      return this.$store.state.game.homeScores
    },
    timeRemain(){
      return this.$store.state.game.time
    },
    timeHalf(){
      return this.$store.state.game.timeHalf
    },
    isHalftime: function () {
      return this.$store.state.game.isHalftime
    },
    isOvertime: function () {
      return this.$store.state.game.isOvertime
    },
    gameEnd () {
      return this.$store.state.game.gameEnd
    },
    quarter(){
      if(this.$store.state.game.quarter == 1){
        return '1ST'
      } else if(this.$store.state.game.quarter == 2){
        return '2ND'
      } else if(this.$store.state.game.quarter == 3){
        return '3RD'
      } else if(this.$store.state.game.quarter == 4){
        return '4TH'
      } else {
        return 'OVERTIME'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#scoreboard-wrapper{
  width: 100%;
  height: 125px;
  background: linear-gradient(rgba(0,0,0,1), rgba(33,33,33,1));
  font-family: 'Lato', sans-serif;
  margin: 20px 0 7px;
  border-top: 1px solid #222;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
}

.info-bar{
  width: 100%;
  height: 25px;
  background: #111;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  overflow: hidden;
}

.team-name{
  width: 175px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

#clock p{
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.team-logo{
  width: 125px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  @media screen and (max-width: 1599px) {
    margin: 0 5px;
  }
}

.scoreboard{
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

#awayPossession{
  position: absolute;
  top: 35%;
  left: 27%;
  @media screen and (max-width: 1599px) {
    top: 38%;
    left: 26%;
    width: 25px;
  }
}

#homePossession{
  position: absolute;
  top: 35%;
  right: 27%;
  @media screen and (max-width: 1599px) {
    top: 38%;
    right: 26%;
    width: 25px;
  }
}

.score{
  color: #fff;
  font-size: 4.25rem;
  font-weight: 700;
  height: 95px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1599px) {
    font-size: 3.5rem;
  }
}

#qtr-score{
  width: 500px;
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

#qtr-wrapper{
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
  @media screen and (max-width: 1599px) {
    width: 65%;
    font-size: 0.85rem;
  }
}

#qtr, #awayQtr, #homeQtr{
  display: flex;
  align-items: center;
  height: 30%;
}

#awayQtr, #qtr{
  border-bottom: 1px solid #333;
}

.qtr{
  width: 20%;
  text-align: center;
  margin-left: 10px;
}

.team {
  text-align: left;
}

.bar{
  width: 100%;
  height: 12px;
  background: #111;
}

.win{
  color: gold;
}
</style>