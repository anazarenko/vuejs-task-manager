<template>
  <div>
    <div class="row tasks">
      <div class="col s4">
        <h5>TODO</h5>
        <app-task v-for="task in todo" :task="task" :key="task.id"></app-task>
      </div>
      <div class="col s4">
        <h5>DOING</h5>
        <app-task v-for="task in doing" :task="task" :key="task.id"></app-task>
      </div>
      <div class="col s4">
        <h5>DONE</h5>
        <app-task v-for="task in done" :task="task" :key="task.id"></app-task>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Task.vue'
  import { eventBus } from '../main'

  export default {
    name: 'Home',
    data () {
      return {
        todo: [
          {
            id: 1,
            title: 'Learn English',
            description: 'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          },
          {
            id: 2,
            title: 'Make dinner',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          },
          {
            id: 3,
            title: 'Make dinner',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          },
          {
            id: 4,
            title: 'Make dinner',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          },
          {
            id: 5,
            title: 'Make dinner',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          },
          {
            id: 6,
            title: 'Make dinner',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          }
        ],
        doing: [],
        done: []
      }
    },
    components: {
      appTask: Task
    },
    methods: {
      removeTask (items, taskId) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === taskId) {
            items.splice(i, 1)
            return true
          }
        }
        return false
      }
    },
    created () {
      eventBus.$on('createTask', (task) => {
        this.doing.unshift(task)
      })
      eventBus.$on('deleteTask', (taskId) => {
        let isRemove = this.removeTask(this.todo, taskId)
        if (!isRemove) {
          isRemove = this.removeTask(this.doing, taskId)
          if (!isRemove) {
            this.removeTask(this.done, taskId)
          }
        }
      })
    }
  }
</script>

<style scoped>
  .tasks>.col {
    min-height: 500px;
  }
  h5 {
    text-align: center;
  }
</style>
