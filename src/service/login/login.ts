import hyRequest from '..'
import type { AccountType } from '@/types'
export function accountLoginRequest(account: AccountType) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfoByID(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}
export function getUsermenuByRoleID(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
