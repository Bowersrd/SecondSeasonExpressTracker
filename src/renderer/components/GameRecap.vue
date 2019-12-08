<template>
    <div id="modal-wrapper" v-show="viewRecap">
        <div class="recap-container" id="game-recap">
            <div id="header">
                <h1>Second Season Express</h1>
                <h1>FINAL</h1>
            </div>
            <div class="teams">
                <div class="team">
                    <div class="team-logo" :style="`backgroundColor: ${awayTeam.color}`">
                        <img :src="awayLogo" alt="Away Logo">
                        <div class="team-name">
                            <p class="city"> {{ awayTeam.city }} </p>
                            <h1 class="mascot"> {{ awayTeam.mascot }} </h1>
                        </div>
                    </div>
                    <div class="score" :style="`backgroundColor: ${awayTeam.color}`">
                        <p> {{ awayTotalScore }} </p>
                    </div>
                </div>
                <div class="team">
                    <div class="team-logo" :style="`backgroundColor: ${homeTeam.color}`">
                        <img :src="homeLogo" alt="Home Logo">
                        <div class="team-name">
                            <p class="city"> {{ homeTeam.city }} </p>
                            <h1 class="mascot"> {{ homeTeam.mascot }} </h1>
                        </div>
                    </div>
                    <div class="score" :style="`backgroundColor: ${homeTeam.color}`">
                        <p> {{ homeTotalScore }} </p>
                    </div>
                </div>
            </div>
            <div class="summary">
                <div id="title">
                    <p>Scoring Summary</p>
                </div>
                <ul id="drives">
                    <li v-for="drives in scoringDrives" :key="drives.play">
                        <span v-if="drives.poss == 'away'"><img :src="awayLogo" alt="Away Logo"></span>
                        <span v-else><img :src="homeLogo" alt="Home Logo"></span>
                        {{ drives.play }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="action-container">
            <a href="#" class="btn" @click="downloadRecap">Download Recap</a>
            <a href="#" class="btn" @click="toggleRecap">Back</a>
        </div>
    </div>
</template>

<script>
import htmlToImage from 'html-to-image';

export default {
    methods: {
        toggleRecap () {
            this.$store.dispatch('toggleRecap')
        },
        downloadRecap () {
            htmlToImage.toJpeg(document.getElementById('game-recap'), { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'SSX - Game Recap.jpeg';
                link.href = dataUrl;
                link.click();
            })
        }
    },
    computed: {
        scoringDrives: function () {
            return this.$store.getters.scoringDrives
        },
        viewRecap: function () {
            return this.$store.state.game.gameRecap
        },
        awayTeam: function () {
            return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.awayTeam)
        },
        homeTeam: function () {
            return this.$store.state.league.teams.find(team => team.id == this.$store.state.game.homeTeam)
        },
        awayLogo: function () {
           const path = require('path')
           let team = this.awayTeam

            if (team.logo.includes('/logos/')) {
                return path.join(__static, team.logo)
            } else {
                return team.logo
            }
        },
        homeLogo: function () {
            const path = require('path')
            let team = this.homeTeam

            if (team.logo.includes('/logos/')) {
                return path.join(__static, team.logo)
            } else {
                return team.logo
            }
        },
        awayTotalScore: function () {
            return this.$store.getters.awayTotal
        },
        homeTotalScore: function () {
            return this.$store.getters.homeTotal
        }
    }
}
</script>

<style lang="scss" scoped>
$white: #ecf0f1;

#modal-wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.75 );
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media screen and (max-width: 1599px) {
        flex-direction: row;   
        padding-left: 70px; 
    }
  }

  .recap-container {
      width: 750px;
      height: auto;
      outline: 1px solid #595e69;
      border: 1px solid #798296;
  }

  .action-container {
      width: 500px;
      height: 70px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      text-align: center;
      .btn{
        width: 200px;
        height: 50px;
        padding: 15px 25px;
        outline: 1px solid $white;
        color: $white;
        text-decoration: none;
        margin: 10px auto;
        transition: all 0.4s ease-in-out;
        animation: text-slide-in 2.5s;
        &:hover{
            background: $white;
            color: #000;
        }
        }
        @media screen and (max-width: 1599px) {
            flex-direction: column;
            .btn {
                background: #111;
                color: $white;
                opacity: 0.9;
                &:hover{
                    background: $white;
                    color: #000;
                }
            }
        }
  }

  #header {
      width: 100%;
      height: 50px;
      background: #1b2130;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
          color: $white;
          text-transform: uppercase;
          font-size: 1.5rem;
          margin: 0 40px 0 20px;
          letter-spacing: 2px;
      }
  }

  .teams {
      width: 100%;
      height: 190px;
  }

  .summary {
      width: 100%;
      height: auto;
      padding-bottom: 20px;
      background: #151a25;
      & #title {
          width: 100%;
          height: 25px;
          background: #1b2130;
          color: $white;
          display: flex;
          align-items: center;
          p {
              margin-left: 20px;
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 3px;
              font-weight: 700;
          }
      }
  }

  .team {
      width: 100%;
      height: 50%;
      display: flex;
  }

  .team-logo {
      width: 80%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      color: $white;
      img {
          height: 200%;
      }
  }

  .team-name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.9rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-left: 20px;
      & .city {
          font-size: 0.85rem;
          letter-spacing: 5px;
      }
      & .mascot {
          font-size: 3rem;

      }
  }

  .score {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: brightness(90%);
      p {
          color: $white;
          font-weight: 900;
          font-size: 3.7rem;
      }
  }

  #drives {
     list-style: none;
     color: $white;
     display: flex;
     flex-direction: column;
     margin-top: 10px;
     li {
         font-size: 0.8rem;
         display: flex;
         align-items: center;
         letter-spacing: 1px;
         margin: 5px;
         text-transform: uppercase;
         border-bottom: 1px solid #1b2130;
     }
     img {
         height: 25px;
         margin: 0 10px;
     }
  }
</style>