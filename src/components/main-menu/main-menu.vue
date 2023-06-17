<template>
  <div class="main-menu">
    <div class="title">
      <div class="logo">
        <img src="@/assets/img/logo.jpg" alt="" />
      </div>
      <h2>管理系统</h2>
    </div>
    <div class="content">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="isFold ? true : false"
        active-text-color="#409eff"
      >
        <template v-for="item in usersMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 字符串el-icon-moanitor转组件=>动态组件 -->
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="1-1">核心技术</el-menu-item>
          <el-menu-item index="1-2">商品统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">部门管理</el-menu-item>
          <el-menu-item index="2-3">菜单管理</el-menu-item>
          <el-menu-item index="2-4">角色管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item index="3-1">商品类别</el-menu-item>
          <el-menu-item index="3-2">商品信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><ChatLineRound /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item index="4-1">你的故事</el-menu-item>
          <el-menu-item index="4-2">故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
import { firstMenu, mapPathToMenu } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
//接收父组件的数据
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const usersMenus = loginStore.userMenu

//处理页面跳转的点击
const handClick = (item: any) => {
  const url = item.url
  router.push(url)
}
//ElMenu默认菜单
//获取当前路径
const route = useRoute()

//获取第一个页面的id
const defaultActive = computed(() => {
  const PathMenu = mapPathToMenu(route.path, usersMenus)
  return PathMenu.id + ''
})
</script>
<style lang="less" scoped>
.main-menu {
  // background-color: #fff;
  background-color: #f0f2f5;
  position: absolute;
  top: 0;
  left: 0;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    .el-sub-menu {
      background-color: #f0f2f5;
      // justify-content: center;
      // margin-left: 10px;
      // align-items: center;
      .el-menu-item {
        background-color: #f0f2f5;
      }
    }
  }

  .title {
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding-left: 20px;
    .logo {
      img {
        border-radius: 50%;
        height: 30px;
        width: 30px;
        margin-right: 10px;
      }
    }
    h2 {
      // color: white;
    }
  }
}
</style>
