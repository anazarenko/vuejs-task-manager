<template>
  <div>
    <div class="modal-overlay" @click="navigateToHome"></div>
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>New Task</h4>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input id="title" type="email" class="validate" v-model="task.title">
                <label for="title" data-error="wrong" data-success="right">Title</label>
              </div>
              <div class="input-field col s12">
                <input id="description" type="text" class="validate" v-model="task.description">
                <label for="description" data-error="wrong" data-success="right">Description</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat" @click="create">Create</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      isValid: true,
      task: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    create () {
      this.task.id = this.guid()
      console.log(this.task)
      this.navigateToHome()
    },
    navigateToHome () {
      this.$router.push({name: 'home'})
    },
    guid () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4()
    }
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
</style>
