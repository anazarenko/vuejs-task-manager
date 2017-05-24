<template>
  <div class="row">
    <div class="col s12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ task.title }}</span>
          <p>{{ task.description }}</p>
        </div>
        <div class="card-action">
          <a href="#">View</a>
          <a href="#">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task']
}
</script>

<style></style>
