<template>
  <div class="user-search">
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="80px" ref="form" size="large" v-if="isQurey">
      <el-row :gutter="80">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'data-picker'">
                <el-date-picker
                  type="daterange"
                  v-model="searchForm[item.prop]"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import usePessmissions from '@/hooks/usePerssions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
//接受数据
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
//判断是否有搜索权限
const isQurey = usePessmissions(`${props.searchConfig.pageName}:query`)
//定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
//重置
const form = ref<InstanceType<typeof ElForm>>()

//自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
function resetForm() {
  //1.重置内容
  form.value?.resetFields()
  //2.发送网络请求，将重置的内容发送出去
  emit('resetClick', searchForm)
}

//处理搜索点击
function handelQueryClick() {
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
