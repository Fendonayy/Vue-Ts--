const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    {
      type: 'selection',
      width: '50px'
    },
    {
      type: 'index',
      label: '序号',
      width: '60px'
    },
    {
      type: 'normal',
      width: '150px',
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'normal',
      label: '角色权限',
      prop: 'intro',
      width: '150px'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间'
    },
    {
      type: 'handel',
      label: '操作',
      width: '160px'
    }
  ]
}
export default contentConfig
