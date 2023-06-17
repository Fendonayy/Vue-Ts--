<template>
  <div class="main">
    <el-container class="content">
      <el-aside :width="isFold ? '60px' : '180px'"
        ><mainMenu :is-fold="isFold"></mainMenu
      ></el-aside>
      <el-container>
        <el-header height="40px"><mainHeader @foldChange="handleChange" /></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
//记录是否折叠
const isFold = ref(false)
//处理子组件的点击事件
const handleChange = (flag: boolean) => {
  isFold.value = flag
}
</script>
<style lang="less" scoped>
.main {
  height: 100vh;

  .content {
    height: 100%;

    position: relative;

    .el-aside {
      background-color: #f0f2f5;
      // display: flex;
      // position: absolute;
      // position: relative;
      transition: width is ease;
    }
    .el-header {
      background-color: #fff;
      width: 100%;
      position: relative;
      z-index: 9;
      border-bottom: 1px solid rgb(139, 130, 130);
    }
    .el-main {
      background-color: #f0f2f5;
      position: relative;
      z-index: 9;
    }
  }
}
</style>
