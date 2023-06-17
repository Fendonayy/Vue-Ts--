<template>
  <div class="login-panel">
    <div class="main-content">
      <div class="title"><h1 class="title">后台管理系统</h1></div>
      <div class="content">
        <!--中间tabs切换-->
        <el-tabs type="border-card" stretch v-model="activeName">
          <!--账号登录pane-->
          <el-tab-pane label="账号登录" name="user">
            <template #label>
              <div class="label">
                <el-icon><UserFilled /></el-icon>
                <span>帐号登录</span>
              </div>
            </template>
            <pane-account ref="accountRef"></pane-account>
          </el-tab-pane>
          <!--搜集登录pane-->
          <el-tab-pane label="手机登录" name="phone">
            <template #label>
              <div class="label">
                <el-icon><Iphone /></el-icon>
                <span>手机登录</span>
              </div>
            </template>
            <pane-phone></pane-phone>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="other-content">
        <div class="left">
          <el-checkbox v-model="rememberPasswd" label="记住密码" />
        </div>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" @click="loginClick">立即登录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'
//记录什么登录方式
const activeName = ref('user')
//绑定子组件
const accountRef = ref<InstanceType<typeof paneAccount>>()
//记录记住密码状态
const rememberPasswd = ref<boolean>(localCache.getCache('rememberPassword') ?? false)
//本地缓存记住密码状态
watch(rememberPasswd, (newValue) => {
  if (newValue) {
    localCache.setCache('rememberPassword', newValue)
  } else {
    localCache.removeCache('rememberPassword')
  }
})
//登录点击
const loginClick = () => {
  if (activeName.value === 'user') {
    //1.获取子组件实例
    //2.调用登录逻辑函数
    accountRef.value?.handLoginBtnClick(rememberPasswd.value)
  } else if (activeName.value === 'phone') {
    console.log('手机登录')
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 300px;
  .content {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .main-content {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    .title {
      text-align: center;
    }
  }
  .other-content {
    color: skyblue;
    display: flex;
    justify-content: space-between;
  }
  // .footer {
  //   background-color: skyblue;
  //   // text-align: center;
  // }
}
</style>
