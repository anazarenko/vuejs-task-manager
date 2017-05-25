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
                <input id="title" name="title" type="text" data-vv-delay="500" v-validate="'required|alpha_spaces'" :class="titleValidation" v-model="task.title">
                <label for="title" data-success="right">Title</label>
                <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
              </div>
              <div class="input-field col s12">
                <input id="description" name="description" type="text" data-vv-delay="500" v-validate="'required'" :class="descriptionValidation" v-model="task.description">
                <label for="description" data-success="right">Description</label>
                <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
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
  import { eventBus } from '../main'

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
        this.$validator.validateAll().then(() => {
          eventBus.createTask(this.task)
          this.navigateToHome()
        }).catch(() => {
//          alert('Correct them errors!')
        })
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
    },
    computed: {
      titleValidation () {
        let validationClass = ''
        let hasError = this.$validator.errorBag.has('title')
        if (this.task.title.length || hasError) {
          validationClass = hasError ? 'invalid' : 'valid'
        }
        return validationClass
      },
      descriptionValidation () {
        let validationClass = ''
        let hasError = this.$validator.errorBag.has('description')
        if (this.task.description.length || hasError) {
          validationClass = hasError ? 'invalid' : 'valid'
        }
        return validationClass
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
  .is-danger {
    color: red;
    font-size: 13px;
  }
  .input-field label.active:after {
    display: none !important;
  }
  .input-field input {
    margin-bottom: 5px !important;
  }
</style>
