import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todayLearning from '@/components/todayLearning'

Vue.use(Router)

export default new Router({
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
