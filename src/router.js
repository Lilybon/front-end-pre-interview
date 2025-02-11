import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/edit/:id?',
      name: 'edit',
      component: () => import('./views/Edit.vue')
    }
  ]
})
