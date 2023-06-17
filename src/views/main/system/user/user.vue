<template>
  <div class="user">
    <div class="search">
      <userSearch @query-click="handelQueryClick" @reset-click="handelresetClick"> </userSearch>
    </div>
    <div class="conent">
      <userContent
        ref="refUserContent"
        @new-users="handelNewusersClick"
        @edit-click="handelEditClick"
      ></userContent>
    </div>
  </div>
  <userModal ref="refuserModal" />
</template>
<script lang="ts" setup>
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
import userModal from './cpns/user-modal.vue'
import { ref } from 'vue'
//操作userContent组件
const refUserContent = ref<InstanceType<typeof userContent>>()
//操作userModal组件
const refuserModal = ref<InstanceType<typeof userModal>>()
//处理搜索点击
function handelQueryClick(formData: any) {
  refUserContent.value?.fetchuserListData(formData)
}
//处理重置点击
function handelresetClick(formData: any) {
  refUserContent.value?.fetchuserListData(formData)
}
//处理新建点击

function handelNewusersClick() {
  refuserModal.value?.setModaldialogVisable()
}
//处理编辑点击
function handelEditClick(info: any) {
  refuserModal.value?.setModaldialogVisable(false, info)
}
</script>
<style lang="less" scoped>
.user {
  .search {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
