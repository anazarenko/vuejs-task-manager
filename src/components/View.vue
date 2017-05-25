<template>
  <div>
    <div class="modal-overlay" @click="navigateToHome"></div>
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>View Task {{ $route.params.id }}</h4>
        <div class="row">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'View',
    methods: {
      navigateToHome () {
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style scoped>
  .modal-overlay {
    z-index: 500;
    display: block;
    opacity: 0.5;
  }
  .modal {
    top: 100px;
    display: block;
    z-index: 600;
  }
</style>
