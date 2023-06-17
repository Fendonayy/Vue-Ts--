import useLoginStore from '@/store/login/login'
import { toRefs } from 'vue'
function usePessmissions(permissionsId: string) {
  const loginStore = useLoginStore()
  const { permissions } = toRefs(loginStore)
  return !!permissions.value.find((item) => item.includes(permissionsId))
}
export default usePessmissions
