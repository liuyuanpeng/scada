import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'rewards', // 继续教育获奖及立项情况
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/college-continue-education-status/list', {
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
    save(collegeContinueEducationStatus) {
      return api
        .post('/college-continue-education-status/save', {
          data: collegeContinueEducationStatus,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (collegeContinueEducationStatus.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === collegeContinueEducationStatus.id) {
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
        .post('/college-continue-education-status/' + id, {
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
