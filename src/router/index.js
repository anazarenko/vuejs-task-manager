import Vue from 'vue'
import Router from 'vue-router'
import Default from '../components/Default.vue'
import Create from '../components/Create.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Default
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
