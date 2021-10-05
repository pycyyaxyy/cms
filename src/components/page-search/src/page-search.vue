<template>
  <div class="page-search">
    <Pe-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="handResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </Pe-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PeForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    PeForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],

  setup(props, { emit }) {
    //双向绑定的属性应该由配置文件的field来决定
    //优化1.formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    formItems.forEach((element: any) => {
      formOriginData[element.field] = ''
    })
    const formData = ref(formOriginData)

    //优化2.当点击重置按钮时
    const handResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    //优化3.当点击搜索按钮时
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
