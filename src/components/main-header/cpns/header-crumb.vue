<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.url">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import useLoginStore from '@/store/login/login'
//根据路径匹配面包屑
const loginStore = useLoginStore()
const userMenus = loginStore.userMenu
const route = useRoute()
//点击菜单后立即刷新面包屑
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>
<style lang="less" scoped>
.header-crumb {
}
</style>
