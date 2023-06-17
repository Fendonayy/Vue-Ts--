<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="rules"
      size="large"
      label-width="60"
      ref="ElFromRef"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { AccountType } from '@/types'
import { localCache } from '@/utils/cache'
const loginStore = useLoginStore()
//定义account数据
const account = reactive<AccountType>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
//定义校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,18}$/, message: '帐号长度6到18位字母或数字组成~', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是三位以上的字母或数字组成', trigger: 'change' }
  ]
}
//执行登录逻辑
const ElFromRef = ref<InstanceType<typeof ElForm>>()
const handLoginBtnClick = (rememberPasswd: boolean) => {
  ElFromRef.value?.validate((valid) => {
    if (valid) {
      //获取帐号和密码
      const name = account.name
      const password = account.password
      //发送网络请求
      loginStore.loginAccountAction({ name, password }).then((res) => {
        //判断记住密码是否选中
        if (rememberPasswd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确格式~')
    }
  })
}
defineExpose({
  handLoginBtnClick
})
</script>
<style lang="less" scoped></style>
