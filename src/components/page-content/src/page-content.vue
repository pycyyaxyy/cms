<template>
  <div class="page-content">
    <pe-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >
          新建用户</el-button
        >
        <el-button icon="el-icon-refresh" size="medium"></el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          icon="el-icon-edit"
          size="mini"
          type="text"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          icon="el-icon-delete"
          size="mini"
          type="text"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 在page-content中动态插入剩余的插槽 这里很难懂 要时不时回头来看看 -->
      <template
        v-for="item in otherPropSlot"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot
        ></template>
      </template>
    </pe-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import PeTable from '@/base-ui/table'

export default defineComponent({
  components: {
    PeTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    //0.获取用户操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    //1双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())

    // 2发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // const selectionChange = () => {
    //   console.log('选中了表单')
    // }

    // 4.获取其他动态插槽
    const otherPropSlot = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') {
          return false
        }
        if (item.slotName === 'updateAt') {
          return false
        }
        if (item.slotName === 'handler') {
          return false
        }
        return true
      }
    )

    //5.删除、编辑、新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlot,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
      // selectionChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
