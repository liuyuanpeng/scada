import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'supportRequires', // 支持服务的要求
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/public-study-center-service-demand/list', {
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
    save(publicStudyCenterServiceDemand) {
      return api
        .post('/public-study-center-service-demand/save', {
          data: publicStudyCenterServiceDemand,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (publicStudyCenterServiceDemand.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === publicStudyCenterServiceDemand.id) {
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
        .delete('/public-study-center-service-demand/' + id, {
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
