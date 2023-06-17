<template>
  <div class="user-search">
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="80px" ref="form" size="large">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name"
            ><el-input v-model="searchForm.name" placeholder="请输入用户名" /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname"
            ><el-input v-model="searchForm.realname" placeholder="请输入真实姓名" /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入手机号码" /> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="状态" prop="enable"
            ><el-select
              v-model="searchForm.enable"
              placeholder="请选择你的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="创建时间" prop="createAt"
            ><el-date-picker
              type="daterange"
              v-model="searchForm.createAt"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间" /></el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <!-- 重置按钮和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="resetForm">重置</el-button>
      <el-button type="primary" icon="Search" round @click="handelQueryClick">搜索</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
//重置
const form = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
//自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
const resetForm = () => {
  //1.重置内容
  form.value?.resetFields()
  //2.发送网络请求，将重置的内容发送出去
  emit('resetClick', searchForm)
}

//处理搜索点击
const handelQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>
<style lang="less" scoped>
.user-search {
  // border-radius: 8px;
  // overflow: hidden;
  // padding: 20px;
  .el-form-item {
    padding: 20px 30px;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
