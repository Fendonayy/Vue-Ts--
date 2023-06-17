<template>
  <div class="app">
    <!-- <router-link to="/login">登录</router-link>
    <router-link to="/main">主页</router-link> -->

    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style lang="less" scoped>
.app {
  height: 100%;
  width: 100%;
  // background-color: skyblue;
}
</style>
