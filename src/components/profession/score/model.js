import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'professionScore', // 专业设置 - 学分制
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		/**
     * 导入学分制专业设置一览表
     * /major-setup-point-system/import
     */
    /**=====================================*/
    getList({currentYear, studyMode}) {
      return api
        .get('/major-setup-point-system/list', {
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
    save(majorSetupPoint) {
      return api
        .post('/major-setup-point-system/save', {
          data: majorSetupPoint,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (majorSetupPoint.id) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === majorSetupPoint.id) {
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
        .delete('/major-setup-point-system/' + id, {
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
