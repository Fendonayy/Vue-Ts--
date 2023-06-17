import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
type IeditCallback = (data: any) => void
type InewCallback = () => void
function usePageModal(newCallback?: InewCallback, editCallback?: IeditCallback) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) {
      newCallback()
    }
  }
  function handleEditClick(info: any) {
    modalRef.value?.setModalVisible(false, info)
    if (editCallback) {
      editCallback(info)
    }
  }
  return { modalRef, handleNewClick, handleEditClick }
}
export default usePageModal
