<template>
  <div id="wrapper">
    <div id="modal-wrapper" v-if="!isLatest">
      <div id="modal">
        <h1>New Version Available</h1>
        <p>It looks like you have an outdated version. Click download to download new version to your computer or you can continue without updating.</p>
        <p id="notes">Release Notes <br> {{ releaseNotes }} </p>
        <a :href="downloadLink" class="btn">Download</a>
        <a href="#" class="btn" @click="closeModal">Close</a>
      </div>
    </div>
    <div class="container">
      <font-awesome-icon id="screen-size" :icon="['fas', 'desktop']" @click="changeWindowSize" />
      <h1 class="title">Second Season Express</h1>
      <div class="btn-container">
        <router-link :to="button.route" class="btn" v-for="button in buttons" :key="button.name"> {{  button.name }} </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['version'],
    name: 'start-screen',
    data: () => {
      return {
        buttons: [
          {name: 'Start New Game', route: '/newgame'},
          {name: 'Continue Game', route: '/ingame'},
          {name: 'Settings', route: '/settings'}
        ],
        latestVersion: '',
        releaseNotes: '',
        downloadLink: null,
        isLatest: true
      }
    },
    methods: {
      closeModal: function () {
        this.isLatest = true
      },
      changeWindowSize: function () {
        const winX = window.outerWidth

        if (winX === 1600) {
          window.resizeTo(1200, 700)
        } else {
          window.resizeTo(1600, 900)
        }
      } 
    },
    mounted () {
      this.axios.get('https://api.github.com/repos/Bowersrd/SecondSeasonExpressTracker/releases').then(response => {
        this.latestVersion = response.data[0].name.substring(0, 6)
        this.releaseNotes = response.data[0].body
        this.downloadLink = response.data[0].assets[0].browser_download_url
        if (this.latestVersion == this.version) {
          this.isLatest = true
        } else {
          this.isLatest = false
        }
      })
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
  animation: text-slide-in 1.5s ease-out;
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
  animation: text-slide-in 2.5s;
  &:hover{
    background: $white;
    color: #000;
  }
}

#modal-wrapper {
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.75);
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

#modal {
  width: 700px;
  height: 570px;
  background: #111;
  outline: 1px solid #333;
  border: 1px solid #222;
  color: $white;
  text-transform: uppercase;
  line-height: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .btn {
    animation: none;
  }
  h1 {
    margin: 20px 0 20px;
  }
  p {
    width: 70%;
    margin-bottom: 20px;
    &#notes {
      font-size: 0.85rem;
      background: #222;
      padding: 20px;
    }
  }
}

#screen-size {
  font-size: 1.2rem;
  color: $white;
  position: absolute;
  top: 20px;
  left: 20px;
  -webkit-app-region: no-drag;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.15)
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
