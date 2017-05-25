<template>
  <div>
    <div class="row tasks">
      <div class="col s4">
        <h5>TODO</h5>
        <draggable class="task-list todo" element="div" v-model="todo" @end="endMove" :options="dragOptions">
          <app-task v-for="task in todo" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DOING</h5>
        <draggable class="task-list doing" element="div" v-model="doing" @end="endMove" :options="dragOptions">
          <app-task v-for="task in doing" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DONE</h5>
        <draggable class="task-list done" element="div" v-model="done" @end="endMove" :options="dragOptions">
          <app-task v-for="task in done" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Task.vue'
//  import { eventBus } from '../main'
  import draggable from 'vuedraggable'

  export default {
    name: 'Home',
//    data () {
//      return {
//        todo: [],
//        doing: [],
//        done: []
//      }
//    },
    components: {
      appTask: Task,
      draggable: draggable
    },
    methods: {
      removeTask (items, taskId) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === taskId) {
            items.splice(i, 1)
//            this.saveToStorage()
            return true
          }
        }
        return false
      },
      endMove (evt) {
//        console.log(evt)
        console.log(evt.oldIndex)
        console.log(evt.newIndex)
        console.log('----')
        this.$store.dispatch('changeTaskPosition', {from: evt.oldIndex, to: evt.newIndex})
//        this.saveToStorage()
      }
    },
    computed: {
      dragOptions () {
        return {
          group: 'tasks'
        }
      },
      todo () {
        return this.$store.getters.todo
      },
      doing () {
        return this.$store.getters.doing
      },
      done () {
        return this.$store.getters.done
      }
    },
    created () {
      this.$store.dispatch('loadFromStorage')
//      eventBus.$on('createTask', (task) => {
//        this.todo.unshift(task)
//        this.saveToStorage()
//      })
//      eventBus.$on('deleteTask', (taskId) => {
//        let isRemove = this.removeTask(this.todo, taskId)
//        if (!isRemove) {
//          isRemove = this.removeTask(this.doing, taskId)
//          if (!isRemove) {
//            this.removeTask(this.done, taskId)
//          }
//        }
//      })
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
