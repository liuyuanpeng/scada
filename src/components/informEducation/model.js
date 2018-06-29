import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'informEducation', // 非学历继续教育基本情况
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/non-degree-continue-education-status/list', {
        		params: {
        			'current-year': currentYear,	// 当前年份，可为null
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
    save(continueEducationStatus) {
      return api
        .post('/non-degree-continue-education-status/save', {
          data: continueEducationStatus,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (continueEducationStatus.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === continueEducationStatus.id) {
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
        .delete('/non-degree-continue-education-status/' + id, {
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
