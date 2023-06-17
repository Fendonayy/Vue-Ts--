<template>
  <div class="pane-phone">
    <el-form size="large" label-width="60" :model="phone">
      <el-form-item label="手机号">
        <el-input v-model="phone.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="content">
          <el-input v-model="phone.authCode" />
          <el-button class="btn">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const phone = reactive({
  phoneNumber: '',
  authCode: ''
})
</script>
<style lang="less" scoped>
.content {
  display: flex;
  .btn {
    margin-left: 8px;
    background-color: #409eff;
    color: white;
  }
}
</style>
