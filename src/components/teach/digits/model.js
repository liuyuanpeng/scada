import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'teachDigits', // 数字资源应用情况
  state: {
  		data: {} // {"config_enum_value_code": "CoursewareApply"}，前端获取到结构之后，根据对应config_enum_value_code取对应值进行显示
  },
  reducers: {},
  effects: {
  		/**
     * 导入资源应用情况一览表
     * /courseware/import
     */
    /**=====================================*/
    getDigitsList(currentYear) {
      return api
        .get('/courseware-apply/list', {
        		params: {
        			'current-year': currentYear,	// 当前年份，不可为null
        			'config-enum-code': 'COURSEWARE_APPLY_MEDIA'		// 对应资源应用情况二级code - COURSEWARE_APPLY_MEDIA
        		},
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          this.setField({
            data: res ? res.data : {}
          })
        })
    },
    save(coursewareApply) {
      return api
        .post('/courseware-apply/save', {
          data: coursewareApply,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (coursewareApply.id) {
            // 修改
            data[res.data.config_enum_value_code] = res.data
          } else {
            data[res.data.config_enum_value_code] = res.data
          }
          this.setField({
            data
          })
        })
    },
    deleteById(id) {
      return api
        .delete('/courseware-apply/' + id, {
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
