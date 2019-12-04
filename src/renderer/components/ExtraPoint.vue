<template>
    <div id="modal-wrapper" v-if="isTouchdown">
      <div id="modal-container">
        <div id="modal-header" :style="`backgroundColor: ${getModalColor}`">
          <p>Touchdown {{ getMascot }}</p>
        </div>
        <div id="modal-body">
          <img :src="logoAway" alt="Team Logo" v-if="!homeHasBall">
          <img :src="logoHome" alt="Team Logo" v-else>
          <div id="xp-btn-container">
            <a href="#" class="btn-xp" @click="xpKicked('Good')">XP is Good</a>
            <a href="#" class="btn-xp" @click="xpKicked('No Good')">XP is No Good</a>  
          </div>
        </div>
        <div id="modal-footer" :style="`backgroundColor: ${getModalColor}`"></div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['logoAway', 'logoHome', 'home', 'away'],
    methods: {
        xpKicked (value) {
            this.$store.dispatch('extraPoint', value)
            this.$store.dispatch('getXp', value)
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
        isTouchdown () {
            return this.$store.state.game.isTouchdown
        }
    }
}
</script>

<style lang="scss" scoped>
$white: #ecf0f1;

.btn-xp{
  width: 70%;
  height: 50px;
  padding: 15px 25px;
  outline: 1px solid $white;
  color: $white;
  text-decoration: none;
  margin: 10px auto;
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
    width: 600px;
    height: 300px;
    background: #070707;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;
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
    width: 80%;
    height: 200px;
    display: flex;
    img{
      height: 100%;
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
  }


</style>