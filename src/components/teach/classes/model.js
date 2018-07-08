import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'teachClasses', // 课程情况
  state: {
  		data: []
  },
  reducers: {},
  effects: {
    getList({currentYear, studyMode}) {
      return api
        .get('/courseware/list', {
        		params: {
        			'current-year': currentYear,	// 当前年份，可为null
        			'study-mode': studyMode		// STUDY_MODE(学习类型)对应二级code，可为null
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
    save(courseware) {
      return api
        .post('/courseware/save', {
          data: courseware,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (courseware.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === courseware.id) {
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
        .post('/courseware/' + id, {
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
