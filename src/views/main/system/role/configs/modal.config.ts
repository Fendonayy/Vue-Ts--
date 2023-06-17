const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      label: '角色名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      label: '角色权限',
      prop: 'intro',
      type: 'input',
      placeholder: '请输人角色权限'
    },
    {
      type: 'custom',
      slotName: 'menuList'
    }
  ]
}
export default modalConfig
