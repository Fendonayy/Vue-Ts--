<template>
  <div class="info">
    <div class="icon">
      <el-icon><Bell /></el-icon>
      <el-icon><ChatLineRound /></el-icon>
      <el-icon><Postcard /></el-icon>
      <div class="contentInfo">
        <el-dropdown>
          <span class="content">
            <el-avatar :size="30" class="image" src="" />
            <span>{{ loginStore.userInfo.name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span
                  ><el-icon><CircleClose /></el-icon
                ></span>
                <span @click="handClick">退出系统</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span
                  ><el-icon><InfoFilled /></el-icon
                ></span>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span
                  ><el-icon><Unlock /></el-icon>
                </span>
                <span>修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import router from '@/router'
import useLoginStore from '@/store/login/login'
//退出系统的操作
const handClick = () => {
  localCache.removeCache('token')
  // localCache.removeCache('userInfo')
  // localCache.removeCache('userMenu')
  router.push('/login')
}
const loginStore = useLoginStore()
</script>
<style lang="less" scoped>
.info {
  :global(.el-dropdown-menu__item) {
    display: flex;
    height: 40px;
    align-content: center;
    justify-content: center;
  }
  height: 100%;
  .icon {
    margin-left: -200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .el-icon {
      margin-left: 15px;
    }
    .dot {
      border: 1px solid red;
    }
  }
  .contentInfo {
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
