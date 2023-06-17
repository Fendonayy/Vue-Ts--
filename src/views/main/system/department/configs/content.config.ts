const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
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
      label: '部门名称',
      prop: 'name',
      width: '150px'
    },
    // {
    //   type: 'custom',
    //   label: '部门名称',
    //   prop: 'name',
    //   width: '150px',
    //   slotName: 'name'
    // },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      width: '150px'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
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
