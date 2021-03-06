export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '70', slotName: 'name' },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '70',
      slotName: 'realname'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '70',
      slotName: 'cellphone'
    },
    { prop: 'enable', label: '状态', minWidth: '70', slotName: 'status' },
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
