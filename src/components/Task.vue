<template>
  <div class="row">
    <div class="col s12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ task.title }} <span class="secondary-content"><img :src="iconSrc"></span></span>
          <p style="font-size: 12px">{{ task.date }} - {{ task.city }} - {{ task.weather.main }} ({{ task.weather.description }})</p>
          <p style="margin-top: 16px">{{ task.description }}</p>
        </div>
        <div class="card-action">
          <router-link :to="viewLink">View</router-link>
          <router-link :to="editLink">Edit</router-link>
          <a @click="deleteTask">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Task',
    props: ['task'],
    data () {
      return {
        viewLink: {
          name: 'taskView',
          params: {
            id: this.task.id
          }
        },
        editLink: {
          name: 'taskEdit',
          params: {
            id: this.task.id
          }
        }
      }
    },
    computed: {
      iconSrc () {
        return `http://openweathermap.org/img/w/${this.task.weather.icon}.png`
      }
    },
    methods: {
      deleteTask () {
        this.$store.dispatch('removeTask', this.task.id)
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
