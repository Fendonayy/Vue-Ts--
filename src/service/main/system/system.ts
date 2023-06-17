import hyRequest from '@/service'

// 请求用户列表
export default function postUserListData(queryinfo: any = {}) {
  return hyRequest.post({
    url: '/users/list',
    data: queryinfo
  })
}
//请求删除用户
export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
//  请求新建用户
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
//请求编辑
export function editUSerData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
/* 页面的增删改查*/
//查询
export function pageListData(pageName: string, info: any = {}) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: info
  })
}
//删除
export function deletepageListData(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
//新增
export function newPageData(pageName: string, info: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: info
  })
}
//编辑
export function editPageData(pageName: string, id: number, info: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: info
  })
}
