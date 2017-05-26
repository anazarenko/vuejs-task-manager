import Vue from 'vue'
import Router from 'vue-router'
import Default from '../components/Default.vue'
import Create from '../components/Create.vue'
import View from '../components/View.vue'
import Edit from '../components/Edit.vue'

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
      path: '/view/:id',
      component: View,
      name: 'taskView',
      props: true
    },
    {
      path: '/edit/:id',
      component: Edit,
      name: 'taskEdit',
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
