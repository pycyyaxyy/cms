<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="DialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <pe-form v-bind="modalConfig" v-model="formData"></pe-form>

      <slot></slot>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCofirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import PeForm from '@/base-ui/form'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    PeForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const DialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮逻辑
    const store = useStore()
    const handleCofirmClick = () => {
      DialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      DialogVisible,
      formData,
      handleCofirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
