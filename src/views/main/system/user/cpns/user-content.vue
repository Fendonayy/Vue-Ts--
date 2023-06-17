<template>
  <div class="user-content">
    <div class="content">
      <div class="header">
        <h3>用户列表</h3>
        <el-button type="primary" @click="handelNuwUserClick">新建用户</el-button>
      </div>
      <div class="table">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column align="center" type="selection" width="50px" />
          <el-table-column align="center" type="index" label="序号" width="60px" />
          <el-table-column prop="name" align="center" label="用户名" width="120px" />
          <el-table-column prop="realname" align="center" label="真实姓名" width="120px" />
          <el-table-column prop="cellphone" align="center" label="手机号码" width="120px" />
          <el-table-column prop="enable" label="状态" align="center" width="80px">
            <!-- 作用域插槽 -->
            <template #default="scope"
              ><el-button :type="scope.row.enable ? 'success' : 'warning'" size="small" plain
                >{{ scope.row.enable ? '启用' : '禁用' }}
              </el-button></template
            >
          </el-table-column>
          <el-table-column prop="createAt" align="center" label="创建时间">
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatUTC(scope.row.createAt) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="updateAt" align="center" label="更新时间">
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatUTC(scope.row.updateAt) }}</span>
              </div>
            </template></el-table-column
          >
          <el-table-column label="操作" align="center" width="160px">
            <template #default="scope">
              <el-button
                size="small"
                icon="Edit"
                text
                type="primary"
                @click="handelEditClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                icon="Delete"
                text
                type="danger"
                @click="handDeleteClick(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotalCount"
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
import { toRefs, ref } from 'vue'
import formatUTC from '@/utils/format'
//自定义事件
const emit = defineEmits(['newUsers', 'editClick'])
//1.发起axios,请求数据
const userListStore = useUserListStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchuserListData()
//2.拿到数据进行展示
// const usersList = userListStore.userList不能展示，因为异步获取数据，开始是一个空的数组，数据不是响应式的所以是空数组
const { userList, userTotalCount } = toRefs(userListStore)
//3.页面相关操作

const handleSizeChange = () => {
  fetchuserListData()
}
const handleCurrentChange = () => {
  fetchuserListData()
}
//4.封装函数，用于放松网络请求
function fetchuserListData(args: any = {}) {
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageinfo = { size, offset }
  const queryinfo = { ...args, ...pageinfo }

  //2.发送网络请求
  userListStore.fetchPostUserList(queryinfo)
}
defineExpose({ fetchuserListData })
//5.编辑和删除操作
//1.删除操作
function handDeleteClick(id: number) {
  userListStore.fetDeleteUserData(id)
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
