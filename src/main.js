import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faPlay, faPlus, faTrash, faBan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueGAPI from 'vue-gapi'

library.add(faEllipsisV, faPlay, faPlus, faTrash, faBan)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const apiConfig = {
  apiKey: 'AIzaSyAY4THLuVYiFhrRAPZCseQDbCO3bxNJD9A',
  clientId: '624530488961-chtl120tenn14g9i8elqlj5m49888nau.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets' // See, edit, create, and delete your spreadsheets in Google Drive
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
}

Vue.use(VueGAPI, apiConfig)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
