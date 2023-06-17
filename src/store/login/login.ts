import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoByID, getUsermenuByRoleID } from '@/service/login/login'
import type { AccountType } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import LOGIN_TOKEN from '@/global/contants'
import mapMenus, { mapUserMenusToPermissions } from '@/utils/map-menus'
import useMainStore from '../main/main'
interface IStata {
  token: string
  userInfo: any
  userMenu: any
  permissions: string[]
}
const useLoginStore = defineStore('login', {
  state: (): IStata => ({
    token: '',
    userInfo: {},
    userMenu: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: AccountType) {
      const loginData = await accountLoginRequest(account)
      //登录，获取taken等信息
      const id = loginData.data.id
      this.token = loginData.data.token
      //进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      //获取用户的详细信息
      const userMessageData = await getUserInfoByID(id)
      const userInfo = userMessageData.data
      this.userInfo = userInfo
      //根据角色请求用户的权限（用户菜单）
      const userMenuData = await getUsermenuByRoleID(this.userInfo.role.id)
      const userMenu = userMenuData.data
      this.userMenu = userMenu
      //获取用户的所有权限
      const permissions: string[] = mapUserMenusToPermissions(userMenu)
      this.permissions = permissions
      //本地缓存用户信息和用户权限
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)
      //请求roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      //页面跳转
      router.push('/main')
      //重要：动态添加路由
      const routes = mapMenus(userMenu)
      routes.forEach((item) => router.addRoute('main', item))
      // 3.router.addRoute('main'，xxx)
    },
    loadLocalCacheAction() {
      //1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        //
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        //请求roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        //获取用户权限
        const permissions: string[] = mapUserMenusToPermissions(userMenu)
        this.permissions = permissions
        //2.加载动态路由
        const routes = mapMenus(userMenu)
        routes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})

export default useLoginStore
