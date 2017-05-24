<template>
  <div class="row">
    <div class="col s12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ task.title }}</span>
          <p>{{ task.description }}</p>
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
