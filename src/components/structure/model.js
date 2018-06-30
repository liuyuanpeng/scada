import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'structure', // 教师构成
  state: {
    data: {}
  },
  reducers: {},
  effects: {
    /**
     * 导入教师构成统计一览表
     * /teacher/import
     */
    /** ===================================== */
    getTeacherList({currentYear, studyMode}) {
      return api
        .get('/teacher/list', {
          params: {
            'current-year': currentYear, // 当前年份，不可为null
            'study-mode': studyMode // STUDY_MODE(学习形式)对应二级code，不可为null
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
    save(teacher) {
      return api
        .post('/teacher/save', {
          data: teacher,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = {...this.getState().data}
          data[teacher.config_enum_value_code] = res.data
          this.setField({
            data
          })
        })
    }
  }
})
