<template>
  <div>
    <div class="row tasks">
      <div class="col s4">
        <h5>TODO</h5>
        <!--<draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">-->
          <!--<div v-for="element in myArray">{{element.name}}</div>-->
        <!--</draggable>-->
        <draggable class="task-list" element="div" v-model="todo" :options="dragOptions">
          <app-task v-for="task in todo" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DOING</h5>
        <draggable class="task-list" element="div" v-model="doing" :options="dragOptions">
          <app-task v-for="task in doing" :task="task" :key="task.id"></app-task>
        </draggable>
      </div>
      <div class="col s4">
        <h5>DONE</h5>
        <draggable class="task-list" element="div" v-model="done" :options="dragOptions">
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
          }
        ],
        doing: [
          {
            id: 6,
            title: 'Play tennis',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          }
        ],
        done: [
          {
            id: 5,
            title: 'Read Book',
            description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.'
          }
        ]
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
            return true
          }
        }
        return false
      },
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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
  .tasks .task-list{
    min-height: 500px;
  }
  h5 {
    text-align: center;
  }
</style>
