<template>
  <div class="role">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handelQueryClick"
      @reset-click="handelresetClick"
    ></pageSearch>
    <pageContent
      :contentConfig="contentConfig"
      ref="RefSearch"
      @edit-click="handelEditClick"
      @new-users="handelNewClick"
    ></pageContent>
    <pageModal :modalConfig="modalConfig" :otherInfo="otherInfo" ref="RefModal">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          @check="handelCheck"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
        /> </template
    ></pageModal>
  </div>
</template>
<script lang="ts" setup>
import { nextTick } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from '../role/configs/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './configs/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from '@/views/main/system/role/configs/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { ref, toRefs } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToId } from '@/utils/map-menus'
const { RefSearch, handelQueryClick, handelresetClick } = usePageContent()
const { RefModal, handelNewClick, handelEditClick } = usePageModal(editCallback)
const mainStore = useMainStore()
const { entireMenus } = toRefs(mainStore)
const treeRef = ref<InstanceType<typeof ElTree>>()
const otherInfo = ref({})
function handelCheck(data1: any, data2: any) {
  const menuLists = [...data2.checkedKeys, ...data2.halfCheckedKeys]

  otherInfo.value = { menuLists }
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToId(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>
<style lang="less" scoped>
.role {
}
</style>
