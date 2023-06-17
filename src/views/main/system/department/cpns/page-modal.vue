<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" /> </el-form-item
          ><el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
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
  leader: '',
  parentId: ''
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
const { entireDepartments } = toRefs(mainStore)
//确认点击逻辑
const listStore = useUserListStore()
function handelConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && userinfo.value) {
    listStore.fetchEditPageData('department', userinfo.value.id, formData)
  } else {
    listStore.fetchNewPageData('department', formData)
  }
}
</script>
<style lang="less" scoped>
.form {
  margin-left: -10px;
}
</style>
