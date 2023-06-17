<template>
  <div class="user-content">
    <div class="content">
      <div class="header">
        <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>

        <el-button type="primary" @click="handelNuwUserClick" v-if="isCreate">{{
          contentConfig?.header?.btnTitle ?? '新建数据'
        }}</el-button>
      </div>
      <div class="table">
        <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
          <template v-for="item in contentConfig.propsList" :key="item.prop">
            <template v-if="item.type === 'timer'">
              <el-table-column :prop="item.prop" align="center" :label="item.label">
                <template #default="scope">
                  <div style="display: flex; align-items: center; justify-content: center">
                    <el-icon><timer /></el-icon>
                    <span style="margin-left: 10px">{{ formatUTC(scope.row[item.prop]) }}</span>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'handel'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <el-button
                    v-if="isUpdate"
                    size="small"
                    icon="Edit"
                    text
                    type="primary"
                    @click="handelEditClick(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="isDelete"
                    size="small"
                    icon="Delete"
                    text
                    type="danger"
                    @click="handDeleteClick(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </template>
            <!-- <template v-else-if="item.type === 'custom'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope"></slot>
                </template>
              </el-table-column>
            </template> -->
            <template v-else>
              <el-table-column align="center" v-bind="item" />
            </template>
          </template>
          <!-- <el-table-column align="center" type="selection" width="50px" />
          <el-table-column align="center" type="index" label="序号" width="60px" />
          <el-table-column prop="name" align="center" label="部门名称" width="120px" />
          <el-table-column prop="leader" align="center" label="部门领导" width="120px" /> -->
          <!-- <el-table-column prop="parentId" align="center" label="上级部门" width="120px" /> -->
          t
          <!-- <el-table-column prop="updateAt" align="center" label="更新时间">
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatUTC(scope.row.updateAt) }}</span>
              </div>
            </template></el-table-column
          > -->
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useUserListStore from '@/store/main/system/system'
import type { ElTableColumn } from 'element-plus'
import usePessmissions from '@/hooks/usePerssions'
import { toRefs, ref } from 'vue'
import formatUTC from '@/utils/format'
import { deletepageListData } from '@/service/main/system/system'
//获取数据
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()
//获取是否有增删改查权限
const isQurey = usePessmissions(`${props.contentConfig.pageName}:query`)
const isCreate = usePessmissions(`${props.contentConfig.pageName}:create`)

const isDelete = usePessmissions(`${props.contentConfig.pageName}:delete`)

const isUpdate = usePessmissions(`${props.contentConfig.pageName}:update`)

//自定义事件
const emit = defineEmits(['newUsers', 'editClick'])
//1.发起axios,请求数据
const userListStore = useUserListStore()
const currentPage = ref(1)
const pageSize = ref(10)
//页码回退至首页
userListStore.$onAction(({ name }) => {
  if (
    name === 'fetchDeletePageData' ||
    name === 'fetchEditPageData' ||
    name === 'fetchNewPageData'
  ) {
    currentPage.value = 1
  }
})
fetchpageListData()
//2.拿到数据进行展示
// const usersList = userListStore.userList不能展示，因为异步获取数据，开始是一个空的数组，数据不是响应式的所以是空数组
const { pageList, pageTotalCount } = toRefs(userListStore)
//3.页面相关操作

const handleSizeChange = () => {
  fetchpageListData()
}
const handleCurrentChange = () => {
  fetchpageListData()
}
//4.封装函数，用于发送网络请求
function fetchpageListData(args: any = {}) {
  if (!isQurey) {
    return
  }
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageinfo = { size, offset }
  const queryinfo = { ...args, ...pageinfo }

  //2.发送网络请求
  userListStore.fetchPostPageList(props.contentConfig.pageName, queryinfo)
}
defineExpose({ fetchpageListData })
//5.编辑和删除操作
//1.删除操作
function handDeleteClick(id: number) {
  userListStore.fetchDeletePageData(props.contentConfig.pageName, id)
}
//2.编辑操作
function handelEditClick(info: any) {
  emit('editClick', info)
}
//6.新建用户操作

function handelNuwUserClick() {
  //发送点击事件
  emit('newUsers')
}
</script>
<style lang="less" scoped>
.user-content {
  background-color: #fff;
  padding: 20px;
  margin-top: 15px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
