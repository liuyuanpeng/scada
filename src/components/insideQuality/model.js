import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'insideQuality', // 内部质量保证
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/quality-guarantee/list', {
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
    save(qualityGuarantee) {
      return api
        .post('/quality-guarantee/save', {
          data: qualityGuarantee,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (qualityGuarantee.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === qualityGuarantee.id) {
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
        .delete('/quality-guarantee/' + id, {
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
