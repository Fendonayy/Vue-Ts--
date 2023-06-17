<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>
<script lang="ts" setup>
import LoginPanel from './c-cpns/login-panel.vue'
// import LoginPanel from 'e:/Vue学习/vue-ts-cms/src/views/login/c-cpns/login-panel.vue'
</script>
<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(@/assets/img/login-bg.svg);
}
</style>
