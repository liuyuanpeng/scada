import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'informational', // 信息化建设情况
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/information-application/list', {
        		params: {
        			'current-year': currentYear,	// 当前年份，不可为null
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
    save(informationApplication) {
      return api
        .post('/information-application/save', {
          data: informationApplication,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (informationApplication.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === informationApplication.id) {
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
        .delete('/information-application/' + id, {
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
