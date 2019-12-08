<template>
    <div id="tracker-wrapper">
        <div id="drive-bar">
            <a href="#" :class="{active : active_el == 1 }" @click="activate(1)">Drive Summary</a>
            <a href="#" :class="{active : active_el == 2 }" @click="activate(2)">Scoring Summary</a>
        </div>
        <div id="drive-container">
            <ul class="drive" v-show="active_el == 1">
                <li v-for="drive in drives" :key="drive.play" v-bind:class="{ touchdown : drive.play.includes('TOUCHDOWN') || drive.play.includes('KICK IS GOOD'), penalty : drive.play.includes('PENALTY') }">
                    <span v-if="drive.poss == 'away'"><img :src="logoAway" alt="Away Logo"></span>
                    <span v-else><img :src="logoHome" alt="Away Logo"></span>
                    {{ drive.play }}
                </li>
            </ul>
            <ul class="drive" v-show="active_el == 2">
                <li v-for="drives in scoringDrives" :key="drives.play">
                    <span v-if="drives.poss == 'away'"><img :src="logoAway" alt="Away Logo"></span>
                    <span v-else><img :src="logoHome" alt="Home Logo"></span>
                    {{ drives.play }}
                </li>
            </ul>
        </div>
        <div id="menu">
            <router-link :to="button.route" class="btn" v-for="button in buttons" :key="button.name"> {{  button.name }} </router-link>
            <a href="#" class="btn" @click="endHalftime" v-show="isHalftime">Begin 2nd Half</a>
            <a href="#" class="btn" @click="endOvertime" v-show="isOvertime && !isGameOver">End Overtime</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['logoAway', 'logoHome'],
    data: () => {
        return{
            buttons: [
                {name: 'Start New Game', route:'/newgame'},
                {name: 'Settings', route:'/settings'},
                {name: 'Main Menu', route:'/'},
            ],
            active_el: 1
        }
    },
    methods: {
        activate: function (el) {
            this.active_el = el
        },
        endHalftime: function () {
            this.$store.dispatch('endHalftime')
        },
        endOvertime: function () {
            this.$store.dispatch('endOvertime')
        }
    },
    computed: {
        drives: function () {
            return this.$store.state.summary.drives
        },
        scoringDrives: function () {
            return this.$store.getters.scoringDrives
        },
        isHalftime: function () {
            return this.$store.state.game.isHalftime
        },
        isOvertime: function () {
            return this.$store.state.game.isOvertime
        }, 
        isGameOver: function () {
            return this.$store.state.game.gameEnd
        }
    }
}
</script>

<style lang="scss" scoped>
    $white: #ecf0f1;

    #tracker-wrapper{
        width: 100%;
        height: 300px;
        background: linear-gradient(rgba(20,20,20,1), rgba(0,0,0,1));
        border-bottom: 1px solid #222;
        border-left: 1px solid #222;
        border-right: 1px solid #222;
        position: relative;
        @media screen and (max-width: 1599px) {
            margin-bottom: 15px;
        }
    }

    #drive-bar{
        width: 100%;
        height: 25px;
        background: #161616;
        border-bottom: 2px solid #0f0f0f;
        display: flex;
        align-items: center;
        .active{
                opacity: 1;
                font-weight: 700;
            }
        a{
            color: #fff;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 400;
            letter-spacing: 1px;
            text-decoration: none;
            padding: 3px;
            margin-left: 10px;
            opacity: 0.3;
            
        }
    }

    #menu{
        width: 100%;
        height: 50px;
        display: flex;
        position: absolute;
        bottom: 0;
        border-top: 2px solid #111;
    }

    #drive-container{
        width: 100%;
        height: 225px;
        overflow-x: hidden;
        ul{
            color: #ccc;
            text-transform: uppercase;
            font-size: 0.75rem;
            list-style: none;
            li{
                margin: 15px 20px 10px;
                text-align: left;
                padding-bottom: 10px;
                border-bottom: 1px solid #222;
                display: flex;
                align-items: center;
                &:first-child{
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #fff;
                }
                img{
                    margin-right: 10px;
                    width: 25px;
                }
                &.touchdown{
                    color: green;
                }
                &.penalty{
                    color: yellow;
                }
            }
        }
        @media screen and (max-width: 1599px) {
            height: 145px;
        }
    }

    .btn{
  width: (100% / 3);
  height: 50px;
  padding: 15px 25px;
  font-size: 0.9rem;
  outline: 1px solid #070707;
  color: $white;
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  &:hover{
    background: #070707;
    color: $white;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 12px;
}
 
/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 5px;
    border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(35,35,35,0.5); 
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
</style>