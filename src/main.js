// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(VueResource)

export const eventBus = new Vue({
  methods: {
    createTask (task) {
      this.$emit('createTask', task)
    },
    deleteTask (taskId) {
      this.$emit('deleteTask', taskId)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
