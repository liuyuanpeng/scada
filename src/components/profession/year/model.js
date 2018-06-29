import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'professionYear', // 专业设置 - 学年制
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		/**
     * 导入学年制专业设置一览表
     * /major-setup-year-system/import
     */
    /**=====================================*/
    getList({currentYear, studyMode}) {
      return api
        .get('/major-setup-year-system/list', {
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
    save(majorSetupYear) {
      return api
        .post('/major-setup-year-system/save', {
          data: majorSetupYear,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (majorSetupYear.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === majorSetupYear.id) {
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
        .delete('/major-setup-year-system/' + id, {
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
