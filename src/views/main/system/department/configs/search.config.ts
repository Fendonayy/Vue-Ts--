const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门的名称'
      // initialValue: 'bbbb'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '领导名称',
      placeholder: '请输入查询的领导的名称'
    },
    {
      type: 'data-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
export default searchConfig
