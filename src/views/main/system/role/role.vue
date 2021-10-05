<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      ref="pageModelRef"
      pageName="role"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { ElTree } from 'element-plus'
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  name: 'role',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      // console.log({ ...item.menuList })
      const leftKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leftKeys, false)
      })
    }
    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const entireMenu = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      elTreeRef,
      otherInfo,
      entireMenu,
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModelRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
