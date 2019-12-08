<template>
  <div id="app">
    <nav id="nav-wrapper">
      <a href="#"><font-awesome-icon :icon="['fas', 'minus-circle']" @click="minWindow" /></a>
      <a href="#"><font-awesome-icon :icon="['fas', 'times-circle']" @click="closeWindow" /></a>
    </nav>
    <router-view :version="version"></router-view>
    <div class="version">
      <p> {{ version }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'second-season-express',
    data: () => {
      return {
        version: 'v0.6.5'
      }
    },
    methods: {
      closeWindow: () => {
        window.close()
      },
      minWindow: () => {
        const { remote } = require('electron')
        remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body{
    font-family: 'Roboto', sans-serif;
  }

  #nav-wrapper{
    position: fixed;
    width: 100%;
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    -webkit-app-region: drag;
    & a{
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      margin: 15px 15px 0 0;
      transition: transform 0.3s;
      -webkit-app-region: no-drag;
      &:hover{
        transform: scale(1.15);
      }
    }
  }

  .version{
    position: fixed;
    bottom: 0;
    width: 100%;
    & p {
      color: #fff;
      font-size: 0.8rem;
      margin: 0 0 10px 15px;
    }
    @media screen and (max-width: 1599px) {
      p {
        margin: 0 0 3px 15px;
      }
    }
  }

  .container{
    width: 75%;
    margin: 0 auto;
  }

  // Disable Double-Click Selection
  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
  }
  input, button, textarea, :focus {
    outline: none; // You should add some other style for :focus to help UX/a11y
  }

</style>
