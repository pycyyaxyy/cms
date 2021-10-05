export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '70', slotName: 'name' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '70',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '70',
      slotName: 'newPrice'
    },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '70', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  //是否需要显示列表的序号
  showIndexColumn: true,
  //是否让行能被选中
  selectColum: true
}
