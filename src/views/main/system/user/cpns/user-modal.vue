<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" /> </el-form-item
          ><el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" /> </el-form-item
          ><el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select> </el-form-item
          ><el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handelConfirm"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useUserListStore from '@/store/main/system/system'
import { toRefs } from 'vue'
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
//记录是否显示密码（编辑的时候不显示）
const isNewRef = ref(true)
//记录表单数据
const userinfo = ref()
//定义属性
const dialogVisible = ref(false)
//定义设置dialogVisible的方法
function setModaldialogVisable(isnew: boolean = true, info?: any) {
  isNewRef.value = isnew

  dialogVisible.value = true
  if (!isnew && info) {
    for (const key in formData) {
      formData[key] = info[key]
    }
    userinfo.value = info
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    userinfo.value = ''
  }
}
defineExpose({ setModaldialogVisable })
//获取数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = toRefs(mainStore)
//确认点击逻辑
const listStore = useUserListStore()
function handelConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && userinfo.value) {
    listStore.fetchEditUSerData(userinfo.value.id, formData)
  } else {
    listStore.fetchNewUserData(formData)
  }
}
</script>
<style lang="less" scoped>
.form {
  margin-left: -10px;
}
</style>
