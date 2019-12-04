<template>
  <div id="wrapper">
    <div class="container">
      <h1 class="title">Second Season Express</h1>
      <div class="btn-container">
        <router-link :to="button.route" class="btn" v-for="button in buttons" :key="button.name"> {{  button.name }} </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start-screen',
    data: () => {
      return {
        buttons: [
          {name: 'Start New Game', route: '/newgame'},
          {name: 'Continue Game', route: '/ingame'},
          {name: 'Settings', route: '/settings'}
        ]
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
