import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import chapter1 from '@/components/chapter1'
import chapter2 from '@/components/chapter2'
import chapter4 from '@/components/chapter4'
import waiwai4 from '@/components/waiwai4'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chapter1',
      name: 'chapter1',
      component: chapter1
    },
    {
      path: '/chapter2',
      name: 'chapter2',
      component: chapter2
    },
    {
      path: '/chapter4',
      name: 'chapter4',
      component: chapter4
    },
    {
      path: '/waiwai4',
      name: 'waiwai4',
      component: waiwai4
    }
  ]
})
