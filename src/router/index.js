import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/User'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Manage from '../views/Manage.vue'
import Song from '../views/Song.vue'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'about', path: '/about', component: About },
  {
    name: 'manage',
    path: '/manage-music',
    component: Manage,
    meta: {
      requiresAuth: true
    }

    //alias: '/manage'
  },
  { name: 'song', path: '/song/:id', component: Song },
  { path: '/manage', redirect: { name: 'manage' } },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (await store.checkForUser()) {
    next()
    console.log(await store.checkForUser())
    return
  } else {
    console.log(await store.checkForUser())
    next({ name: 'home' })
  }
})

export default router
