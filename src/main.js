import Vue from 'vue'
import App from './App.vue'

import VueGAPI from "vue-gapi"

const apiConfig = {
  apiKey: "AIzaSyAY4THLuVYiFhrRAPZCseQDbCO3bxNJD9A",
  clientId: "624530488961-chtl120tenn14g9i8elqlj5m49888nau.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets" // See, edit, create, and delete your spreadsheets in Google Drive
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

Vue.use(VueGAPI, apiConfig);
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
