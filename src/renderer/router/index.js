import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-screen',
      component: require('@/components/StartScreen').default
    },
    {
      path: '/newgame',
      name: 'new-game',
      component: require('@/components/NewGame').default
    },
    {
      path: '/ingame',
      name: 'in-game',
      component: require('@/components/InGame').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
