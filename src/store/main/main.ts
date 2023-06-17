import { defineStore } from 'pinia'
import { getEntireRoles, getEntireDepartments, getEntireMenus } from '@/service/main/main'
interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('mian', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const menusResult = await getEntireMenus()
      // console.log(menusResult)

      //保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = menusResult.data.list
      // console.log(this.entireDepartments)
      //   console.log(this.entireMenus)
      // }
    }
  }
})
export default useMainStore
