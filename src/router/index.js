import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todayLearning from '@/components/todayLearning'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/xyz',
      name: 'today learning',
      component: todayLearning
    }
  ]
})
