import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'schoolEducationOrg', // 学校办学机构
  state: {
    data: []
  },
  reducers: {},
  effects: {
    /**
     * 导入继续教育机构基本信息excel表格
     * /organization/import
     */
    getList() {
      // 获取继续教育机构基本信息列表
      return api
        .get('/organization/list', {
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          this.setField({
            data: res ? res.data : []
          })
        })
    },
    saveOrganization(organization) {
      // 创建/更新继续教育机构基本信息
      return api
        .post('/organization/save', {
          data: organization,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (organization.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === organization.id) {
                data[i] = res.data
                break
              }
            }
          } else {
            data.push(res.data)
          }
          this.setField({
            data
          })
        })
    },
    deleteByOrganizationId(organizationId) {
      // 删除继续教育机构基本信息
      return api
        .delete('/organization/' + organizationId, {
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          const dataIndex = data.findIndex(item => item.id === organizationId)
          data.splice(dataIndex, 1)
          this.setField({
            data
          })
        })
    }
  }
})
