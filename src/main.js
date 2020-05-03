import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Auth from './components/Auth.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Caixas from './components/Caixas.vue'
import Transactions from './components/Transactions.vue'
import Categories from './components/Categories.vue'
import modal from 'vue-js-modal'
import VueSweetAlert from 'vue-sweetalert'
 
Vue.use(VueSweetAlert)
Vue.use(modal)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/register',
      component: Register
    },
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/',
      component: Auth
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/caixas',
      component: Caixas
    },
    {
      path: '/transactions/:id',
      component: Transactions
    },
    {
      path: '/categories',
      component: Categories
    }
  ]
})

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
