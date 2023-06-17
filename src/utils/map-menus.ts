import type { RouteRecordRaw } from 'vue-router'
function loadlocalRoutes() {
  // 1.动态获取所有的路有对象，放到数组里面
  // *路有对象都在独立的文件中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取 router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  //1.2将加载出来的对象放到localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export default function mapMenus(userMenu: any) {
  //1.加载本地路由
  const localRoutes = loadlocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //给route的顶层菜单增加重定向功能（但只需要增加一次）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      //记录匹配到的第一个菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
}
export function mapPathToMenu(path: string, userMenu: any) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
interface breadCrumbsType {
  name: string
  url: string
}
export function mapPathToBreadcrumbs(path: string, userMenu: any[]) {
  const breadCrumbs: breadCrumbsType[] = []
  for (const menu of userMenu) {
    for (const submennu of menu.children) {
      if (submennu.url === path) {
        breadCrumbs.push({ name: menu.name, url: menu.url })
        breadCrumbs.push({ name: submennu.name, url: submennu.url })
      }
    }
  }
  return breadCrumbs
}
//取menuList中的Id
export function mapMenuListToId(menuLsits: any) {
  const ids: number[] = []
  function resurseId(menus: any) {
    for (const item of menus) {
      if (item.children) {
        resurseId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  resurseId(menuLsits)
  return ids
}
//获取用户的权限
export function mapUserMenusToPermissions(menuLsits: any[]) {
  const permissions: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuLsits)
  return permissions
}
