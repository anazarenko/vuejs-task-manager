<template>
  <div id="app" class="container">
    <app-header></app-header>
    <app-home></app-home>
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from './components/Home.vue'
  import Header from './components/Header.vue'

  export default {
    name: 'app',
    components: {
      appHome: Home,
      appHeader: Header
    }
  }
</script>

<style></style>
