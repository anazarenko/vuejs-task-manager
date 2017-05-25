<template>
  <div>
    <div class="row tasks">
      <div class="col s4">
        <h5>TODO</h5>
        <draggable class="task-list" element="div" v-model="todo" @end="endMove" :options="dragOptions">
          <app-task v-for="task in todo" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DOING</h5>
        <draggable class="task-list" element="div" v-model="doing" @end="endMove" :options="dragOptions">
          <app-task v-for="task in doing" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DONE</h5>
        <draggable class="task-list" element="div" v-model="done" @end="endMove" :options="dragOptions">
          <app-task v-for="task in done" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Task.vue'
  import { eventBus } from '../main'
  import draggable from 'vuedraggable'

  export default {
    name: 'Home',
    data () {
      return {
        todo: [],
        doing: [],
        done: []
      }
    },
    components: {
      appTask: Task,
      draggable: draggable
    },
    methods: {
      removeTask (items, taskId) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === taskId) {
            items.splice(i, 1)
            this.saveToStorage()
            return true
          }
        }
        return false
      },
      endMove (evt) {
//        console.log(evt)
//        console.log(evt.oldIndex)
//        console.log(evt.newIndex)
        this.saveToStorage()
      },
      loadFromStorage () {
        this.todo = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []
        this.doing = JSON.parse(localStorage.getItem('doing')) ? JSON.parse(localStorage.getItem('doing')) : []
        this.done = JSON.parse(localStorage.getItem('done')) ? JSON.parse(localStorage.getItem('done')) : []
      },
      saveToStorage () {
        localStorage.setItem('todo', JSON.stringify(this.todo))
        localStorage.setItem('doing', JSON.stringify(this.doing))
        localStorage.setItem('done', JSON.stringify(this.done))
      }
    },
    computed: {
      dragOptions () {
        return {
          group: 'tasks'
        }
      }
    },
    created () {
      this.loadFromStorage()
      eventBus.$on('createTask', (task) => {
        this.todo.unshift(task)
        this.saveToStorage()
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
  .tasks .task-list{
    min-height: 500px;
  }
  h5 {
    text-align: center;
  }
  .sortable-chosen {
    opacity: 0.5;
  }
</style>
