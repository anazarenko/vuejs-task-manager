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
                <v-select
                  :debounce="1000"
                  :on-search="getVSelectOptions"
                  :options="vSelectOptions"
                  :on-change="changeCity"
                  placeholder="Search City..."
                  label="full_name"
                >
                </v-select>
                <input id="city" name="city" style="display: none" type="text" data-vv-delay="500" v-validate="'required'" :class="cityValidation" v-model="task.city">
                <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
              </div>
              <div class="input-field col s12">
                <datepicker v-model="selectedDate" name="date" :input-class="dateValidation" :disabled="dateConstraints.disabled" data-vv-delay="500" v-validate="'required'"></datepicker>
                <!--<input id="date" name="date" type="date" data-vv-delay="500" v-validate="'required'" :class="dateValidation" v-model="task.date">-->
                <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
              </div>
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
  import Datepicker from 'vuejs-datepicker'
  import axios from 'axios'
  import vSelect from 'vue-select'

  const OPEN_WEATHER_KEY = 'fb8f9655c18e2c723a01bb1f23ad7026'

  export default {
    name: 'Create',
    data () {
      return {
        isValid: true,
        vSelectOptions: [],
        task: {
          title: '',
          description: '',
          date: '',
          city: '',
          weather: ''
        },
        todayDate: null,
        selectedDate: null,
        dateConstraints: {
          disabled: {
            to: '',
            from: ''
          }
        }
      }
    },
    components: {
      datepicker: Datepicker,
      vSelect: vSelect
    },
    methods: {
      create () {
        this.task.id = this.guid()
        this.$validator.validateAll().then(() => {
          const diff = this.dateDiffDays(this.todayDate, this.selectedDate)
          this.task.date = this.selectedDate.toLocaleDateString('en-GB')
          this.getWeather(diff)
        }).catch(() => {
//          alert('Correct them errors!')
        })
      },
      navigateToHome () {
        this.$router.push({name: 'home'})
      },
      dateDiffDays (date1, date2) {
        const dt1 = new Date(date1)
        const dt2 = new Date(date2)
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
      },
      getWeather (cnt) {
        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
          params: {
            q: this.task.city,
            cnt: cnt + 1,
            appid: OPEN_WEATHER_KEY
          }
        })
          .then(response => {
            let data = response.data.list.pop()
            this.task.weather = data.weather[0]
            eventBus.createTask(this.task)
            this.navigateToHome()
          })
          .catch(e => {
            alert('Error while getting weather. Please try again later')
          })
      },
      getVSelectOptions (search, loading) {
        loading(true)
        this.$http.get('https://api.teleport.org/api/cities', {
          params: {
            search: search,
            limit: 5
          }
        })
          .then(response => {
            let result = JSON.parse(response.bodyText)
            let cities = result._embedded['city:search-results']
            let options = []
            cities.forEach((currentValue, index, array) => {
              options.push(currentValue.matching_full_name)
              this.vSelectOptions = options
              loading(false)
            })
          }, response => {
            loading(false)
          })
      },
      changeCity (val) {
        this.task.city = JSON.stringify(val)
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
      },
      dateValidation () {
        let validationClass = ''
        let hasError = this.$validator.errorBag.has('date')
        if (this.selectedDate.length || hasError) {
          validationClass = hasError ? 'invalid' : 'valid'
        }
        return validationClass
      },
      cityValidation () {
        let validationClass = ''
        let hasError = this.$validator.errorBag.has('city')
        if (this.task.city.length || hasError) {
          validationClass = hasError ? 'invalid' : 'valid'
        }
        return validationClass
      }
    },
    created () {
      this.todayDate = new Date()
      this.selectedDate = new Date()
      let date = new Date()
      this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1))
      this.dateConstraints.disabled.to = new Date(date.setDate(date.getDate()))
      this.dateConstraints.disabled.from = new Date(date.setDate(date.getDate() + 14))
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
  .modal-content {
    padding-bottom: 50px;
  }
</style>
