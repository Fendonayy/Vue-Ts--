<template>
  <div class="main-header">
    <div class="icon" @click="iconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <info></info>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import info from './cpns/info.vue'
import { ref } from 'vue'
import headerCrumb from './cpns/header-crumb.vue'
//自定义事件
const emit = defineEmits(['foldChange'])
//记录状态
const isFold = ref(false)
//icon点击事件
const iconClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  // line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  // border: 1px solid #8d183f;
  // margin-top: 5px;
  .icon {
    margin-top: 6px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
