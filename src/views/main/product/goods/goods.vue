<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          fit="fit"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope"> {{ '¥' + scope.row.oldPrice }} </template>
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  components: {
    PageContent,
    PageSearch
  },
  name: 'goods',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
