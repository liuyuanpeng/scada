import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'supportWays', // 支持服务的途径
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/public-study-center-service-model/list', {
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
    save(publicStudyCenterServiceModel) {
      return api
        .post('/public-study-center-service-model/save', {
          data: publicStudyCenterServiceModel,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (publicStudyCenterServiceModel.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === publicStudyCenterServiceModel.id) {
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
        .delete('/public-study-center-service-model/' + id, {
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
