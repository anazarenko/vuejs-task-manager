<template>
  <div>
    <div class="modal-overlay" @click="navigateToHome"></div>
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>{{ task.title }} <span v-if="iconSrc"><img :src="iconSrc"></span></h4>
        <hr>
        <div class="row">
          <div class="col s12">
            <p><strong>Place information:</strong> {{ task.date }} - {{ task.city }} - {{ task.weather.main }} ({{ task.weather.description }})</p>
            <p><strong>Description:</strong> {{ task.description }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat" @click="deleteTask">Delete</a>
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Edit</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'View',
    data () {
      return {
        task: null
      }
    },
    methods: {
      navigateToHome () {
        this.$router.push({name: 'home'})
      },
      getData () {
        this.task = this.$store.getters.getTaskById(this.$route.params.id)
        this.iconSrc = `http://openweathermap.org/img/w/${this.task.weather.icon}.png`
      },
      deleteTask () {
        this.$store.dispatch('removeTask', this.task.id)
        this.$router.push({name: 'home'})
      }
    },
    created () {
      this.getData()
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
  .strong {
    font-weight: 700 !important;
  }
</style>
