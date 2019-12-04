const getDefaultState = () => {
    return {
        drives: [],
        kickoff: [
            // kickoff return
            {play: `recieve the kickoff and get a return on the play.`, poss:''},
            {play: `catch the kickoff in the endzone, bring it out for a return.`, poss:''},
            // long kickoff return
            {play: `find a crease down the middle and return it for a long gain.`, poss:''},
            {play: `bring the ball out and find room down the sideline.`, poss:''},
            // touchdown
            {play: `take the kickoff down the middle and return it all the way.`, poss:''},
            {play: `find a hole down the sidelines and return it all the way.`, poss:''},
            // touchback
            {play: `recieve the kickoff and take a knee for the toucback.`, poss:''},
            {play: `wait for the kick, kick sails out of the endzone, touchback.`, poss:''},
        ],
        run: [
            // short runs
            {play: `run the ball up the middle for a gain.`, poss:''},
            {play: `bounce it outside for a short gain.`, poss:''},
            {play: `find wiggle room and move ahead for a short gain.`, poss:''},
            // medium runs
            {play: `break a few tackles and get a nice gain.`, poss:''},
            {play: `take the ball and run it outside for a good gain.`, poss:''},
            {play: `find a hole and get into the secondary.`, poss:''},
            // long runs
            {play: `break loose in the secondary for a long gain.`, poss:''},
            {play: `ball carrier cannot be broguht down, long gain.`, poss:''},
            {play: `find room on the outside and head down the sideline for a long gain.`, poss:''},
            // no gain
            {play: `rush up the middle but get stuffed at the line.`, poss:''},
            {play: `drive stalls after minimal gain on the run.`, poss:''},
            {play: `bounce outside but gets tackled for no gain.`, poss:''}
        ],
        pass: [
            // short pass
            {play: `pass it over the middle for short gain.`, poss:''},
            {play: `find a reciever in tight coverage.`, poss:''},
            {play: `dump it off for a short gain on the outside.`, poss:''},
            // medium pass
            {play: `connect across the middle for a nice gain.`, poss:''},
            {play: `attack through the air for a moderate gain.`, poss:''},
            {play: `find an open reciever down the sidelines.`, poss:''},
            // long pass
            {play: `air it out and connect on a long gain.`, poss:''},
            {play: `fire it down field and connect for a long gain.`, poss:''},
            {play: `open the pass attack and march down the field.`, poss:''},
            // incomplete
            {play: `pass the ball over the middle but the ball is tipped.`, poss:''},
            {play: `pass the ball and it bounces off the reciever's hands.`, poss:''},
            {play: `try to squeze it into tight coverage, ball almost intercepted.`, poss:''},
            {play: `throw the ball away, no one was open.`, poss:''},
            // sack
            {play: `cannot find anyone open and get sacked.`, poss:''},
            {play: `cannot handle the pass rush, sacked.`, poss:''}
        ],
        fieldGoal: [
            {play: `line up to attempt field goal, KICK IS GOOD.`, poss:''},
            {play: `line up to attempt field goal, KICK IS NO GOOD.`, poss:''}
        ],
        punt: [
            {play: `wait for the punt, take over after short punt.`, poss:''},
            {play: `handle the punt and the offense will take the field.`, poss:''},
            {play: `break through the line and block the punt.`, poss:''},
            {play: `find the seam on the return and take it back all the way.`, poss:''}
        ],
        turnover: [
            {play: `make a play on the ball and intercept it, no return.`, poss:''},
            {play: `get the interception and are able to make a return.`, poss:''},
            {play: `make the interception and return it all the way.`, poss:''},
            {play: `recover the ball after the offense fumbles.`, poss:''},
            {play: `take over after the offense fails to convert on fourth down.`, poss:''},
        ],
        penalty: [
            {play: `get called for the offensive penalty and kill the drive.`, poss:''},
            {play: `get called for the defensive penalty and sustain the drive.`, poss:''}
        ]
    }
}

const state = getDefaultState()

const getters = {
    scoringDrives: (state) => {
        return state.drives.filter(drive => drive.play.includes('TOUCHDOWN') || drive.play.includes('KICK IS GOOD'))
    }
}

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    GET_DRIVE: (state, { team, poss, type, value, qtr, time }) => {
        if (qtr > 4) {
            qtr = 'OT'
        } else {
            qtr = `Q${qtr}`
        }
        
        if (type == 'kickoff') {
            if (value < 5) {
                let rand = Math.floor(Math.random() * (2 - 0)) - 0
                let play = `${qtr} (${time}:00) ${team} ${state.kickoff[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive) 
            } else if (value > 4) {
                let rand = Math.floor(Math.random() * (3 - 2 + 1)) + 2
                let play = `${qtr} (${time}:00) ${team} ${state.kickoff[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive) 
            } else if (value == 'Touchdown') {
                let rand = Math.floor(Math.random() * (5 - 4 + 1)) + 4
                let play = `${qtr} (${time}:00) ${team} ${state.kickoff[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive) 
            } else {
                let rand = Math.floor(Math.random() * (7 - 6 + 1)) + 6
                let play = `${qtr} (${time}:00) ${team} ${state.kickoff[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive) 
            }
        } else if (type == 'run') {
            if (value != 0 && value < 3) { // Short Runs
                let rand = Math.floor(Math.random() * (3 - 0)) - 0
                let play = `${qtr} (${time}:00) ${team} ${state.run[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else if (value > 2 && value < 5) { // Medium Runs
                let rand = Math.floor(Math.random() * (5 - 3 + 1)) + 3
                let play = `${qtr} (${time}:00) ${team} ${state.run[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else if (value > 4) { // Long Runs
                let rand = Math.floor(Math.random() * (8 - 6 + 1)) + 6
                let play = `${qtr} (${time}:00) ${team} ${state.run[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else {
                let rand = Math.floor(Math.random() * (11 - 9 + 1)) + 9
                let play = `${qtr} (${time}:00) ${team} ${state.run[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            }
        } else if (type == 'pass') {
            if (value != 0 && value < 3) { // Short Pass
                let rand = Math.floor(Math.random() * (3 - 0)) - 0
                let play = `${qtr} (${time}:00) ${team} ${state.pass[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else if (value > 2 && value < 5) { // Medium Pass
                let rand = Math.floor(Math.random() * (5 - 3 + 1)) + 3
                let play = `${qtr} (${time}:00) ${team} ${state.pass[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else if (value > 4) { // Long Pass
                let rand = Math.floor(Math.random() * (8 - 6 + 1)) + 6
                let play = `${qtr} (${time}:00) ${team} ${state.pass[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else if (value == 'Sack') {
                let rand = Math.floor(Math.random() * (14 - 13 + 1)) + 13
                let play = `${qtr} (${time}:00) ${team} ${state.pass[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            } else {
                let rand = Math.floor(Math.random() * (12 - 9 + 1)) + 9
                let play = `${qtr} (${time}:00) ${team} ${state.pass[rand].play}`
                let teamPoss = poss
                let drive = {play: play, poss: teamPoss}
                state.drives.unshift(drive)
            }
        } else if (type == 'fieldGoal') {
                if (value == 'Kick is Good') {
                    let play = `${qtr} (${time}:00) ${team} ${state.fieldGoal[0].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else {
                    let play = `${qtr} (${time}:00) ${team} ${state.fieldGoal[1].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                }
        } else if (type == 'punt') {
                if (value < 3) {
                    let play = `${qtr} (${time}:00) ${team} ${state.punt[0].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else if (value > 2) {
                    let play = `${qtr} (${time}:00) ${team} ${state.punt[1].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else if (value == 'Block') {
                    let play = `${qtr} (${time}:00) ${team} ${state.punt[2].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else {
                    let play = `${qtr} (${time}:00) ${team} ${state.punt[3].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                }
        } else if (type == 'turnover') {
                if (value < 0) {
                    let play = `${qtr} (${time}:00) ${team} ${state.turnover[1].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else if (value >= 0) {
                    let play = `${qtr} (${time}:00) ${team} ${state.turnover[0].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else if (value == 'Touchdown') {
                    let play = `${qtr} (${time}:00) ${team} ${state.turnover[2].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else if (value == 'Turnover on Downs') {
                    let play = `${qtr} (${time}:00) ${team} ${state.turnover[4].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                } else {
                    let play = `${qtr} (${time}:00) ${team} ${state.turnover[3].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
                }
        } else if (type == 'penalty') {
                if (value == 'Offense') {
                    let play = `${qtr} (${time}:00) ${team} ${state.penalty[0].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
            } else {
                    let play = `${qtr} (${time}:00) ${team} ${state.penalty[1].play}`
                    let teamPoss = poss
                    let drive = {play: play, poss: teamPoss}
                    state.drives.unshift(drive)
            }
        }
    },
    GET_XP: (state, value) => {
        if (value == 'Good') {
            state.drives[0].play += ' TOUCHDOWN (EXTRA POINT IS GOOD)'
        } else {
            state.drives[0].play += ' TOUCHDOWN (EXTRA POINT IS NO GOOD)'
        }
    }
}

const actions = {
    resetSummary ({ commit }) {
        commit('RESET_STATE')
      },
    getDrive ({ commit }, { team, poss, type, value, qtr, time }) {
        commit('GET_DRIVE', { team, poss, type, value, qtr, time })
    },
    getXp ({ commit }, value) {
        commit('GET_XP', value)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}

