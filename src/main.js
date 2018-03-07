import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import './css/reset.css'
import API from './api/api'
import {Alert} from './lib/alert'
import Validation from 'vuelidate'
import VueCropper from 'vue-cropper-simple'
import VueWangeditor from 'vue-wangeditor-simple'
// import 'prismjs/themes/prism-solarizedlight.css'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs/prism'
import 'prismjs/components/prism-less'

Vue.use(Router)
Vue.use(Validation)
Vue.use(VueCropper)
Vue.use(VueWangeditor)

Vue.config.productionTip = false

Vue.prototype.$http = API
Vue.prototype.$prism = Prism
Vue.prototype.Alert = new Alert()

new Vue({
  el: '#app',
  router: new Router(routes),
  template: '<App/>',
  components: { App }
})
