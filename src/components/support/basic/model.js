import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'supportBasic', // 软硬件建设 - 基本情况 非公共服务体系(校外学习中心／函授站／教学点基本情况)
  state: {
  		data: []
  },
  reducers: {},
  effects: {
    getList(currentYear) {
      return api
        .get('/non-public-study-center/list', {
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
    save(nonPublicStudyCenter) {
      return api
        .post('/non-public-study-center/save', {
          data: nonPublicStudyCenter,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (nonPublicStudyCenter.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === nonPublicStudyCenter.id) {
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
        .delete('/non-public-study-center/' + id, {
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
