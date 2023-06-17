import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(info: any) {
    contentRef.value?.fetchpageListData(info)
  }

  function handleResetClick(info: any) {
    contentRef.value?.fetchpageListData(info)
  }
  return { contentRef, handleQueryClick, handleResetClick }
}
export default usePageContent
