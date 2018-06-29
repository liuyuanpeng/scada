import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'summaryBasic', // 办学情况 - 总体规模
  state: {
  		data: []
  },
  reducers: {},
  effects: {
    getList({currentYear, educationCategory}) {
      return api
        .get('/organization-scale/list', {
        		params: {
        			'current-year': currentYear,	// 当前年份，可为null
        			'education-category': educationCategory		// EDUCATION_CATEGORY(教育类型)对应二级code，可为null
        		},
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
    save(organizationScale) {
      return api
        .post('/organization-scale/save', {
          data: organizationScale,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (organizationScale.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === organizationScale.id) {
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
    deleteById(id) {
      return api
        .delete('/organization-scale/' + id, {
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          const dataIndex = data.findIndex(item => item.id === id)
          data.splice(dataIndex, 1)
          this.setField({
            data
          })
        })
    },
  }
})
