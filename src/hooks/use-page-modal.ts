import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({}) //要传过去给pageModal的表单信息
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.DialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.DialogVisible = true
    }

    editCb && editCb(item)
  }
  return [pageModelRef, defaultInfo, handleNewData, handleEditData]
}
