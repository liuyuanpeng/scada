import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'supportStudy', // 校外学习中心（公共服务体系）
  state: {
  		data: []
  },
  reducers: {},
  effects: {
    getList(currentYear) {
      return api
        .get('/public-study-center/list', {
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
    save(publicStudyCenter) {
      return api
        .post('/public-study-center/save', {
          data: publicStudyCenter,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (publicStudyCenter.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === publicStudyCenter.id) {
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
        .post('/public-study-center/' + id, {
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
