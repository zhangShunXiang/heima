import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'vant/lib/index.css'
import vant from 'vant'
import '@/styles/index.less'
import api from '@/api'
import MeatTitle from "@/components/MeatTitle" 
import todoStroage from './utils/storage'  
Vue.config.productionTip = false
Vue.use(vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.component({MeatTitle})