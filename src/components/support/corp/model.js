import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'supportCrop', // 合作单位情况
  state: {
  		data: []
  },
  reducers: {},
  effects: {
    getList(currentYear) {
      return api
        .get('/non-public-study-center-cooperator/list', {
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
    save(nonPublicStudyCenterCooperator) {
      return api
        .post('/non-public-study-center-cooperator/save', {
          data: nonPublicStudyCenterCooperator,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (nonPublicStudyCenterCooperator.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === nonPublicStudyCenterCooperator.id) {
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
        .delete('/non-public-study-center-cooperator/' + id, {
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
