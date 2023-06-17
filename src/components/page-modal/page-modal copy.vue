<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </el-form-item>
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-else>
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="value in item.options" :key="value.id">
                    <el-option :label="value.label" :value="value.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
          </template>
          <!-- <el-form-item label="部门名称" prop="name">
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
          </el-form-item> -->
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
import useUserListStore from '@/store/main/system/system'
//定义数据
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = initialData.initialValue ?? ''
}
const formData = reactive<any>(initialData)
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
// const mainStore = useMainStore()
// const { entireDepartments } = toRefs(mainStore)
//确认点击逻辑
const listStore = useUserListStore()
function handelConfirm() {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && userinfo.value) {
    listStore.fetchEditPageData(props.modalConfig.pageName, userinfo.value.id, infoData)
  } else {
    listStore.fetchNewPageData(props.modalConfig.pageName, infoData)
  }
}
</script>
<style lang="less" scoped>
.form {
  margin-left: -10px;
}
</style>
