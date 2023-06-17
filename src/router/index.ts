import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import LOGIN_TOKEN from '@/global/contants'
import { firstMenu } from '@/utils/map-menus'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})
//导航守卫
//to(跳转到得位置)，from（从哪里跳转过来）
//返回值：返回值决定导航的路径（不返回或者返回undefined，默认跳转）
//例子：/=>/mian:to:/,from:/main
router.beforeEach((to, from) => {
  //只有登录成功（token）,才能进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})
export default router
