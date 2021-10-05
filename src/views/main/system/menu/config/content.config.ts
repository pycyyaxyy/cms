export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100', slotName: 'name' },
    {
      prop: 'type',
      label: '类型',
      minWidth: '60'
    },
    {
      prop: 'url',
      label: '菜单的url',
      minWidth: '70'
    },
    { prop: 'icon', label: '菜单icon', minWidth: '70' },
    { prop: 'permission', label: '按钮权限', minWidth: '70' },
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
  showIndexColumn: false,
  //是否让行能被选中
  selectColum: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
