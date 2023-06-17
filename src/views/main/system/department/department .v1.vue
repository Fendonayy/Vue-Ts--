<template>
  <div class="department">
    <pageSearch @query-click="handelQueryClick" @reset-click="handelresetClick"></pageSearch>
    <pageContent
      ref="RefSearch"
      @edit-click="handelEditClick"
      @new-users="handelNewClick"
    ></pageContent>
    <pageModal ref="RefModal"></pageModal>
  </div>
</template>
<script lang="ts" setup>
import pageSearch from './cpns/page-search.vue'
import pageContent from './cpns/page-content.vue'
import pageModal from './cpns/page-modal.vue'
import { ref } from 'vue'
//处理搜素点击
//操作pageSearch组件
const RefSearch = ref<InstanceType<typeof pageContent>>()
function handelQueryClick(info: any) {
  RefSearch.value?.fetchpageListData(info)
}
//处理重置点击
function handelresetClick(info: any) {
  RefSearch.value?.fetchpageListData(info)
}
//处理编辑/新建操作
const RefModal = ref<InstanceType<typeof pageModal>>()
function handelNewClick() {
  RefModal.value?.setModaldialogVisable()
}
function handelEditClick(info: any) {
  RefModal.value?.setModaldialogVisable(false, info)
}
</script>
<style lang="less" scoped></style>
