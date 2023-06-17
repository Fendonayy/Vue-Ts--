import { defineStore } from 'pinia'
import useMainStore from '../main'
import postUserListData, {
  deleteUserData,
  newUserData,
  editUSerData,
  pageListData,
  deletepageListData,
  newPageData,
  editPageData
} from '@/service/main/system/system'
interface IStata {
  userList: any[]
  userTotalCount: number
  pageList: any[]
  pageTotalCount: number
}
//重要：如果不定义类型，userList是：never[]类型，如果拿数据是拿不到的；
const useUserListStore = defineStore('userList', {
  state: (): IStata => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //请求用户列表
    async fetchPostUserList(queryinfo: any) {
      const userListResult = await postUserListData(queryinfo)
      const { totalCount, list } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    //请求删除用户
    async fetDeleteUserData(id: number) {
      //1.删除数据
      const deleteData = await deleteUserData(id)
      // console.log(deleteData)
      //2.重新请求数据
      this.fetchPostUserList({ offset: 0, size: 10 })
    },
    //请求新建用户
    async fetchNewUserData(userInfo: any) {
      //1.新建用户
      const newResult = await newUserData(userInfo)
      //2.重新请求数据
      this.fetchPostUserList({ offset: 0, size: 10 })
      // console.log(newResult)
    },
    //请求编辑用户
    async fetchEditUSerData(id: number, info: any) {
      //1.编辑用户
      const editResult = await editUSerData(id, info)
      // console.log(editResult)
      //2.重新请求数据
      this.fetchPostUserList({ offset: 0, size: 10 })
    },
    /* 页面的增删改查*/
    //查询
    async fetchPostPageList(pageName: string, info: any) {
      const pageListResult = await pageListData(pageName, info)
      const { totalCount, list } = pageListResult?.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    //删除
    async fetchDeletePageData(pageName: string, id: number) {
      const deleteResult = await deletepageListData(pageName, id)
      // console.log(deleteResult)
      this.fetchPostPageList(pageName, { offset: 0, size: 10 })
      //重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    //新增
    async fetchNewPageData(pageName: string, info: string) {
      const newResult = await newPageData(pageName, info)
      // console.log(newResult)
      // console.log(info)

      this.fetchPostPageList(pageName, { offset: 0, size: 10 })
      //重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    //编辑
    async fetchEditPageData(pageName: string, id: number, info: string) {
      const newResult = await editPageData(pageName, id, info)
      // console.log(info)

      this.fetchPostPageList(pageName, { offset: 0, size: 10 })
      //重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useUserListStore
