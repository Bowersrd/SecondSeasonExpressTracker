<template>
    <div id="wrapper">
        <div class="container">
            <h1 class="title">Select Your Matchup</h1>
            <div class="team-select">
                <div id="away-select">
                    <div class="logo" :style="`backgroundColor: ${awayTeam.color}`">
                        <img width="90%" :src="awayImg" alt="Away Team Logo">
                        <img width="125%" :src="awayImg" alt="Away Team Logo" class="logoBg">
                    </div>
                    <div class="name" id="awayName" :style="`backgroundColor: ${awayTeam.color}`">
                        <div class="teaminfo">
                            <p class="city">{{ awayTeam.city }}</p>
                            <p class="mascot">{{ awayTeam.mascot }}</p>
                        </div>
                        <div class="sortIcons">
                            <font-awesome-icon class="sortUp" :icon="['fas', 'sort-up']" @click="scrollUpAway" />
                            <font-awesome-icon class="sortDown" :icon="['fas', 'sort-down']" @click="scrollDownAway" />
                        </div>
                    </div>
                </div>
                <div id="home-select">
                    <div class="logo" :style="`backgroundColor: ${homeTeam.color}`">
                        <img width="90%" :src="homeImg" alt="Home Team Logo">
                        <img width="125%" :src="homeImg" alt="Home Team Logo" class="logoBg">
                    </div>
                    <div class="name" id="homeName" :style="`backgroundColor: ${homeTeam.color}`">
                        <div class="teaminfo">
                            <p class="city">{{ homeTeam.city }}</p>
                            <p class="mascot">{{ homeTeam.mascot }}</p>
                        </div>
                        <div class="sortIcons">
                            <font-awesome-icon class="sortUp" :icon="['fas', 'sort-up']" @click="scrollUpHome" />
                            <font-awesome-icon class="sortDown" :icon="['fas', 'sort-down']" @click="scrollDownHome" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <router-link class="btn" to="/">Back</router-link>
                <router-link class="btn" to="/ingame" @click.native="setTeam">Start Game</router-link>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    data: () => {
        return{
            awayId: 0,
            homeId: 0
        }            
    },
    methods: {
        scrollDownAway(){
            if (this.awayId < this.$store.state.league.teams.length - 1){
                this.awayId++
            } else {
                this.awayId = 0
            }
        },
        scrollDownHome(){
            if (this.homeId < this.$store.state.league.teams.length - 1){
                this.homeId++
            } else {
                this.homeId = 0
            }
        },
        scrollUpAway(){
            if (this.awayId > 0){
                this.awayId--
            } else {
                this.awayId = this.$store.state.league.teams.length - 1
            }
        },
        scrollUpHome(){
            if (this.homeId > 0){
                this.homeId--
            } else {
                this.homeId = this.$store.state.league.teams.length - 1
            }
        },
        setTeam: function(){
            this.$store.dispatch('resetGameState')
            this.$store.dispatch('getAwayTeam', {id: this.awayId})
            this.$store.dispatch('getHomeTeam', {id: this.homeId})
        },
    },
    computed: {
        awayTeam(){
            return this.$store.state.league.teams[this.awayId]
        },
        homeTeam(){
            return this.$store.state.league.teams[this.homeId]
        },
        awayImg(){
            const path = require('path')
            if (this.$store.state.league.teams[this.awayId].logo.includes('/logos/')) {
              return path.join(__static, this.$store.state.league.teams[this.awayId].logo)
            } else {
              return this.$store.state.league.teams[this.awayId].logo
            } 
        },
        homeImg(){
            const path = require('path')
            if (this.$store.state.league.teams[this.homeId].logo.includes('/logos/')) {
              return path.join(__static, this.$store.state.league.teams[this.homeId].logo)
            } else {
              return this.$store.state.league.teams[this.homeId].logo
            }
        },
        favTeam () {
            return this.$store.getters.favTeam
        },
        randTeam () {
            return Math.floor(Math.random() * this.$store.state.league.teams.length - 1) + 1  
        }
    },
    mounted() {
        this.homeId = this.favTeam
        this.awayId = this.randTeam
        if (this.awayId == this.homeId) {
            this.awayId = this.randTeam
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
}

.container{
    text-align: center;
}

.title{
  position: relative;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 3rem;
  color: $white;
  margin-bottom: 25px;
}

.team-select{
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    margin-bottom: 35px;
}

#away-select, #home-select{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid $white;
    position: relative;
    overflow: hidden;
}

.logoBg{
    position: absolute;
    top: -100px;
    left: -70px;
    overflow: hidden;
    opacity: 0.2;
    z-index: -1;
    filter: blur(5px);
}

.logo{
    height: 80%;
    padding: 20px;
    z-index: 1;
    & img{
        filter: drop-shadow(10px 15px 15px #000);
    }
}

.name{
    display: flex;
    justify-content: space-between;
    height: 20%;
    text-align: left;
    line-height: 2.2rem;
    text-transform: uppercase;
    color: $white;
    padding: 20px;
    z-index: 1;
    opacity: 0.8;
    filter: contrast(1.15);
    .city{
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 3px;
    }
    .mascot{
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 1px;
    }
}

#homeName{
    text-align: right;
    flex-direction: row-reverse;
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
  animation: text-slide-in 4.5s;
  &:hover{
    background: $white;
    color: #000;
  }
}

.button-container{
    display: flex;
}

.sortIcons{
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    .sortUp{
        margin-top: 12px;
        transition: color 0.2s ease-in;
        &:hover{
            color: red;
            cursor: pointer;
        }
    }
    .sortDown{
        margin-top: -30px;
        transition: color 0.2s ease-in;
        &:hover{
            color: red;
            cursor: pointer;
        }
    }
}

</style>