<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldChange"
    ></i>
    <div class="content">
      <pe-breadcrumb :breadcrumbs="breadcrumbs"></pe-breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'
import UserInfo from './user-info.vue'
import PeBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    PeBreadcrumb
  },
  name: 'NavHeader',
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑的数据：[{name:,path:}]
    let breadcrumbs = computed(() => {
      const route = useRoute()
      const store = useStore()
      const currentPath = route.path
      const userMenus = computed(() => store.state.login.userMenus)
      return pathMapBreadcrumbs(userMenus.value, currentPath)
    })

    // console.log(breadcrumbs.value)

    return {
      isFold,
      breadcrumbs,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
  }
}
</style>
