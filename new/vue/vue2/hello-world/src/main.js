import Vue from 'vue'
import App from './App.vue'
import { RulesPlugin } from './test/plugins/index'

import directives from './test/directives/directive'

Vue.config.productionTip = false
Vue.use(directives)
Vue.use(RulesPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
