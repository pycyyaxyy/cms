export const contentTableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100', slotName: 'name' },
    {
      prop: 'intro',
      label: '角色介绍',
      minWidth: '100',
      slotName: 'realname'
    },
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
