<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-users="handleNewClick"
    >
      <!-- <template #name="scope"
        ><span class="box">-{{ scope.row.name }}- </span></template
      > -->
    </pageContent>
    <pageModal :modal-config="modalConfigRef" ref="modalRef"></pageModal>
  </div>
</template>
<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './configs/search.config'
import contentConfig from './configs/content.config'
import modalConfig from './configs/modal.config'
import { computed } from 'vue'
import useMainStore from '@/store/main/main'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
//对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
      // console.log(modalConfig)
    }
  })
  return modalConfig
})

//操作pageSearch组件
//处理重置点击
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
//处理编辑/新建操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>
<style lang="less" scoped>
.box {
  color: red;
}
</style>
