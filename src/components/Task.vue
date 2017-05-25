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
          <a>View</a>
          <a @click="deleteTask">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main'

  export default {
    name: 'Task',
    data () {
      return {
        iconSrc: `http://openweathermap.org/img/w/${this.task.weather.icon}.png`
      }
    },
    props: ['task'],
    methods: {
      deleteTask () {
        eventBus.$emit('deleteTask', this.task.id)
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
