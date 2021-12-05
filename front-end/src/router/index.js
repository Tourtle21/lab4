import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyItems from '../views/MyItems.vue';
import Store from '../views/Store.vue';
import Checkout from '../views/Checkout.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/myItems',
    name: 'myItems',
    component: MyItems
  },
  {
    path: '/store',
    name: 'store',
    component: Store
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
