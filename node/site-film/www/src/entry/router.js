import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// start views
import Content from '../app/views/content.vue'
import Header from '../app/views/header.vue'
import Footer from '../app/views/footer.vue'
// end views

const routes = [
  { path: '/content', component: Content },
  { path: '/header', component: Header },
  { path: '/footer', component: Footer }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})