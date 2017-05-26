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
//        let fromList = this.searchListName(evt.from.className)
//        let toList = this.searchListName(evt.to.className)
//        this.$store.dispatch('changeTaskPosition', {
//          from: evt.oldIndex,
//          to: evt.newIndex,
//          fromList: fromList,
//          toList: toList
//        })
//        this.saveToStorage()
      },
      searchListName (classString) {
        if (classString.search('todo') !== -1) {
          return 'todo'
        } else if (classString.search('doing') !== -1) {
          return 'doing'
        } else if (classString.search('done') !== -1) {
          return 'done'
        } else {
          return null
        }
      }
    },
    computed: {
      dragOptions () {
        return {
          group: 'tasks'
        }
      },
      todo: {
        get () {
          return this.$store.getters.todo
        },
        set (list) {
          this.$store.dispatch('updateList', {listName: 'todo', list: list})
        }
      },
      doing: {
        get () {
          return this.$store.getters.doing
        },
        set (list) {
          this.$store.dispatch('updateList', {listName: 'doing', list: list})
        }
      },
      done: {
        get () {
          return this.$store.getters.done
        },
        set (list) {
          this.$store.dispatch('updateList', {listName: 'done', list: list})
        }
      }
    },
    created () {
      this.$store.dispatch('loadFromStorage')
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
