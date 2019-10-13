import Vue from 'vue'
import Vuetify from 'vuetify'
require('vuetify/dist/vuetify.min.css')
require('@mdi/font/css/materialdesignicons.css')
import '@fortawesome/fontawesome-free/css/all.css'
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)


export default new Vuetify({
  icons: {
    iconfont:  'mdi'
  },
})



