import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'studyEffect', // 学生学习效果
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList(currentYear) {
      return api
        .get('/study-effect/list', {
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
    save(studyEffect) {
      return api
        .post('/study-effect/save', {
          data: studyEffect,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (studyEffect.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === studyEffect.id) {
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
        .delete('/study-effect' + id, {
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
