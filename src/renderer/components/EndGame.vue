<template>
    <div id="modal-wrapper" v-if="gameEnd && modalActive">
      <div id="modal-container">
        <div id="modal-header">
          <p>FINAL</p>
        </div>
        <div id="modal-body">
          <img :src="logoAway" alt="Team Logo">
          <p :class="{win: awayTotalScore > homeTotalScore}"> {{ awayTotalScore }} </p>
          <p :class="{win: awayTotalScore < homeTotalScore}"> {{ homeTotalScore }} </p>
          <img :src="logoHome" alt="Team Logo">
        </div>
        <div class="action-container">
            <a href="#" class="btn-xp" @click="toggleRecap">View Recap</a>
            <router-link to="/newgame" class="btn-xp">Start New Game</router-link>
            <a href="#" class="btn-xp" @click="modalActive = false">Close</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['logoAway', 'logoHome', 'home', 'away'],
    data: () => {
        return {
            modalActive: true
        }
    },
    methods: {
        comingSoon () {
            alert('This feature is coming soon!')
        },
        toggleRecap () {
          this.$store.dispatch('toggleRecap')
        }
    },
    computed: {
        getModalColor () {
            if (this.homeHasBall) {
                return this.$store.state.league.teams[this.$store.state.game.homeTeam].color
            } else {
                return this.$store.state.league.teams[this.$store.state.game.awayTeam].color
            }
        },
        getMascot () {
            if (this.homeHasBall) {
                return this.$store.state.league.teams[this.$store.state.game.homeTeam].mascot
            } else {
                return this.$store.state.league.teams[this.$store.state.game.awayTeam].mascot
            }
        },
        homeHasBall () {
            return this.$store.state.game.homeBall
        },
        gameEnd () {
            return this.$store.state.game.gameEnd
        },
        awayTotalScore () {
            return this.$store.getters.awayTotal
        },
        homeTotalScore () {
            return this.$store.getters.homeTotal
        }
    }
}
</script>

<style lang="scss" scoped>
$white: #ecf0f1;

.action-container {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.btn-xp{
  width: 25%;
  height: 50px;
  padding: 15px 25px;
  outline: 1px solid $white;
  color: $white;
  text-decoration: none;
  margin: 0 15px;
  transition: all 0.4s ease-in-out;
  &:hover{
    background: #111;
    color: $white;
  }
}

#modal-wrapper{
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.75 );
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #modal-container{
    width: 700px;
    height: 360px;
    background: #070707;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;
    position: relative;
    border: 1px solid #222;
    outline: 1px solid #333;
  }

  #modal-header{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      color: $white;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 1.5rem;
    }
  }

  #modal-body {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    p {
        color: $white;
        font-size: 4.5rem;
        font-weight: 700;
        align-self: center;
        margin: 0 15px;
        outline: 2px solid $white;
        padding: 10px 15px;
        min-width: 100px;
        text-align: center;
    }
    .win {
      color: gold;
    }
    img{
      height: 90%;
    }
    & #xp-btn-container{
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: 700;
      text-transform: uppercase;
      p{
        color: $white;
        text-align: left;
        margin-left: 20px;
        line-height: 1.4rem;
      }
    }
  }

  #modal-footer{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
  }


</style>