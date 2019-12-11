<template>
    <div id="control-wrapper">
        <div class="team-header" :style="`backgroundColor: ${teamColor}`">
            <img height="100%" :src="logo" alt="Logo">
            <h1>{{ side }}</h1>
        </div>
        <div class="controls" v-show="!showZones">
            <a href="#" class="game-btn" @click="kickoff('kickoff')">Kickoff</a>
            <a href="#" class="game-btn" @click="offense('run')">Run</a>
            <a href="#" class="game-btn" @click="offense('pass')">Pass</a>
            <a href="#" class="game-btn" @click="fieldGoal('fieldGoal')">Field Goal</a>
            <a href="#" class="game-btn" @click="punt('punt')">Punt</a>
            <a href="#" class="game-btn" @click="turnover('turnover')">Turnover</a>
            <a href="#" class="game-btn" @click="penalty('penalty')">Penalty</a>
        </div>
        <div class="controls selection" v-show="showZones">
            <a href="#" class="game-btn" v-for="choice in choices[this.playChoice].choice" :key="choice.choice" @click="advanceZone(choice)" v-show="!isPass && !isFieldGoal && !isPenalty && !isTurnover && !isPenalty">{{ choice }}</a>
            <a href="#" class="game-btn" v-for="choice in choices[this.playChoice].choice" :key="choice.choice" @click="isPassed(choice)" v-show="isPass">{{ choice }}</a>
            <a href="#" class="game-btn" v-for="choice in choices[this.playChoice].choice" :key="choice.choice" @click="isKicked(choice)" v-show="isFieldGoal">{{ choice }}</a>
            <a href="#" class="game-btn" v-for="choice in choices[this.playChoice].choice" :key="choice.choice" @click="getTurnover(choice)" v-show="isTurnover">{{ choice }}</a>
            <a href="#" class="game-btn" v-for="choice in choices[this.playChoice].choice" :key="choice.choice" @click="getPenalty(choice)" v-show="isPenalty">{{ choice }}</a>
        </div>
        <div class="play-selection" v-show="!showZones && ball">
            <p :class="{pass: play.includes('SCREEN') || play.includes('SHORT') || play.includes('MEDIUM') || play.includes('LONG'), run: play.includes('IN') || play.includes('OUT')}"> {{ play }} </p>
            <p :class="{pass: alt.includes('SCREEN') || alt.includes('SHORT') || alt.includes('MEDIUM') || alt.includes('LONG'), run: alt.includes('IN') || alt.includes('OUT')}" id="alt" v-show="hasAlt"> {{ alt }} </p>
            <a href="#" class="game-btn" @click="getPlaycall">Get Play</a>
            <a href="#" class="game-btn" style="backgroundColor: darkgreen"> {{ playerFinder }} </a>
        </div>
    </div>
</template>

<script>
import playcalling from '../../assets/data/playcalling.json'

export default {
    props: ['side', 'opp', 'logo', 'teamColor', 'ball'],
    data: function () {
        return {
            showZones: false,
            playCall: '',
            playChoice: 0,
            choices: [
                {choice: ['Touchback', 2, 3, 4, 5, 6, 7, 'Touchdown', 'Cancel']},
                {choice: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'Cancel']},
                {choice: ['Incomplete', 'Complete', 'Sack', 'Cancel']},
                {choice: ['Kick is Good', 'Kick is No Good', 'Cancel']},
                {choice: [1, 2, 3, 4, 5, 6, 7, 8, 'Block', 'Touchdown', 'Cancel']},
                {choice: ['Interception', 'Fumble', 'Fumble (After Gain)', 'Turnover on Downs', 'Cancel']},
                {choice: ['Offense', 'Defense', 'Defense (+1)', 'Defense (+2)', 'Cancel']},
                {choice: [-5, -4, -3, -2, -1, 0, 1, 2, 3, "Touchdown", "Cancel"]}
            ],
            isFieldGoal: false,
            isPass: false,
            isPenalty: false,
            isTurnover: false,
            playType: '',
            play: '',
            hasAlt: false,
            alt: '',
            playerFinder: null
        }
    },
    methods: {
        kickoff: function (value) {         
            this.showZones = true
            this.playCall = 'kickoff'
            this.playType = value
            this.playChoice = 0
        },
        offense: function (value) {
            if (value == "pass") {
                this.isPass = true
                this.playChoice = 2
            } else {
                this.playChoice = 1
            }
            this.showZones = true
            this.playCall = 'offense'
            this.playType = value
        },
        isPassed: function (value) {
            let type = this.playType
            let poss = this.possession
            let team = this.side
            let qtr = this.getQuarter
            let time = this.getTime

            if (value != 'Cancel') {
                if (value == "Incomplete") {
                    this.isPass = false
                    this.showZones = false
                    this.playType = 'pass'
                    this.advanceZone(0)
                } else if (value == "Sack") {
                    this.$store.dispatch('sack')
                    this.$store.dispatch('setTime')
                    this.playType = 'pass'
                    this.isPass = false
                    this.showZones = false
                    this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                } else {
                    this.isPass = false
                    this.playChoice = 1
                }
            } else {
                this.isPass = false
                this.showZones = false
            }
        },
        advanceZone(value){
            let type = this.playType
            let poss = this.possession
            let team = this.side
            let qtr = this.getQuarter
            let time = this.getTime

            if (value != 'Cancel') {
                if (this.playCall == 'kickoff') {
                    let team = this.opp
                    let poss = this.kickPossession

                    this.$store.dispatch('koZone', value).then(() => {
                        this.showZones = false
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                    })
                } else if (this.playCall == 'offense') {
                    this.$store.dispatch('offZone', value).then(() => {
                        this.showZones = false
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                    })
                } else if (this.playCall == 'punt') {
                    let team = this.opp
                    let poss = this.kickPossession

                    this.$store.dispatch('puntBall', value).then(() => {
                        this.showZones = false
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                    })
                } else if (this.playCall == 'turnover') {
                    let team = this.opp
                    let poss = this.kickPossession

                    this.$store.dispatch('turnover', value).then(() => {
                        this.showZones = false
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                    })
                } else if (this.playCall == 'penalty') {
                    let team = this.opp
                    let poss = this.kickPossession

                    this.$store.dispatch('penalty', value).then(() => {
                        this.showZones = false
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                    })
                }
                this.$store.dispatch('setTime')
                let type = this.playType
            } else {
                this.showZones = false
            }
        },
        fieldGoal: function (value) {
            this.showZones = true
            this.playType = value
            this.isFieldGoal = true
            this.playChoice = 3
        },
        isKicked: function (value) {
            let type = this.playType
            let poss = this.possession
            let team = this.side
            let qtr = this.getQuarter
            let time = this.getTime

            if (value != 'Cancel') {
                if (value == 'Kick is Good') {
                    this.$store.dispatch('fieldGoal')
                } else {
                    this.$store.dispatch('changePoss')
                }
                this.showZones = false
                this.isFieldGoal = false
                this.$store.dispatch('setTime')
                this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
            } else {
                this.showZones = false
                this.isFieldGoal = false
            }
        },
        punt: function (value) {
            this.showZones = true
            this.playCall = 'punt'
            this.playType = value
            this.playChoice = 4
        },
        turnover: function (value) {
            this.showZones = true
            this.playType = value
            this.playChoice = 5
            this.isTurnover = true
        },
        getTurnover: function (value) {
            if (value != 'Cancel') {
                let type = this.playType
                let poss = this.kickPossession
                let team = this.opp
                let qtr = this.getQuarter
                let time = this.getTime

                if (value == 'Fumble') {
                    this.$store.dispatch('changePoss')
                    this.$store.dispatch('setTime')
                    this.showZones = false
                    this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                } else if (value == 'Fumble (After Gain)') {
                    this.$store.dispatch('changePoss')
                    this.showZones = false
                    this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                } else if (value == 'Interception') {
                    this.playChoice = 7
                    this.playCall = 'turnover'
                } else {
                    this.$store.dispatch('changePoss')
                    this.$store.dispatch('setTime')
                    this.showZones = false
                    this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                }
                this.isTurnover = false
            } else {
                this.isTurnover = false
                this.showZones = false
            }
        },
        penalty: function (value) {
            this.showZones = true
            this.playType = value
            this.playChoice = 6
            this.isPenalty = true
        },
        getPenalty: function (value) {
            let type = this.playType
            let qtr = this.getQuarter
            let time = this.getTime

            if (value != 'Cancel') {
                switch (value) {
                    case 'Offense':
                        let team = this.side
                        let poss = this.possession

                        this.showZones = false
                        this.isPenalty = false
                        this.$store.dispatch('setTime')
                        this.$store.dispatch('getDrive', { team, poss, type, value, qtr, time })
                        break;
                    case 'Defense':
                        this.isPenalty = false
                        this.playCall = 'penalty'
                        this.advanceZone(0)
                        break;
                    case 'Defense (+1)':
                        this.isPenalty = false
                        this.playCall = 'penalty'
                        this.advanceZone(1)
                        break;
                    case 'Defense (+2)':
                        this.isPenalty = false
                        this.playCall = 'penalty'
                        this.advanceZone(2)
                        break;
                }
            } else {
                this.isPenalty = false
                this.showZones = false
            }
        },
        getPlaycall: function () {
            let rand = Math.floor(Math.random() * 145)
            let player = Math.floor(Math.random() * 20) + 1
            this.play = playcalling.plays.play[rand].call
            this.playerFinder = player
            if (playcalling.plays.play[rand].alt) {
                this.hasAlt = true
                this.alt = playcalling.plays.play[rand].alt
            } else {
                this.hasAlt = false
            }
        }
    },
    computed: {
        possession: function () {
            if (this.$store.state.game.homeBall) {
                return 'home'
            } else {
                return 'away'
            }
        },
        kickPossession: function () {
            if (this.$store.state.game.homeBall) {
                return 'away'
            } else {
                return 'home'
            }
        },
        getQuarter: function () {
            return this.$store.state.game.quarter
        },
        getTime: function () {
            return this.$store.state.game.time
        }
    }
}
</script>

<style lang="scss" scoped>
    $white: #ecf0f1;

    #control-wrapper{
        width: 100%;
        height: 95vh;
        margin: 20px 10px;
        background: linear-gradient(rgba(20,20,20,1), rgba(0,0,0,1));
        border: 1px solid #222;
        display: flex;
        flex-direction: column;
        position: relative;
        @media screen and (max-width: 1599px) {
            margin: 20px 5px;
        }
    }

    .team-header{
        width: 100%;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        & h1{
            color: #FFF;
            text-transform: uppercase;
            margin: 0 10px;
        }
        @media screen and (max-width: 1599px) {
            height: 55px;
            h1 {
                font-size: 1.4rem;
            }
        }
    }

    .controls{
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
            color: #fff;
            text-transform: uppercase;
            font-size: 1rem;
        }
        &.game-btn{
            color: red;
        }
        @media screen and (max-width: 1599px) {
            
        }
    }

    .game-btn{
        text-decoration: none;
        color: #fff;
        text-transform: uppercase;
        outline: 1px solid #222;
        border: 2px solid #070707;
        padding: 12px 25px;
        width: 80%;
        text-align: center;
        margin: 10px auto;
        transition: all 0.4s ease-in-out;
        &:hover{
            background: #040404;
        }
        &:active{
            transform: scale(0.9)
        }
        @media screen and (max-width: 1599px) {
            padding: 8px 20px;
            margin: 5px auto;
        }
    }

    .play-selection {
        width: 100%;
        height: 200px;
        color: $white;
        position: absolute;
        bottom: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        #alt {
            font-size: 1.3rem;
            padding: 0px;
            border: none;
        }
        .pass {
            color: green;
        }
        .run {
            color: red;
        }
        @media screen and (max-width: 1599px) {
            height: 150px;
        }
    }
</style>