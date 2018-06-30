import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'summaryGenderAge', // 学生来源统计 - 性别年龄职业统计
  state: {
    data: {},
    professionData: {}
  },
  reducers: {},
  effects: {
    getStudentSexAgeJobList({currentYear, studyMode}) {
      return api
        .get('/student/list-sex-age-job', {
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
            data: res.data ? res.data : {}
          })
        })
    },
    getStudentMajorHujiList({currentYear, studyMode}) {
      return api
        .get('/student/list-major-huji', {
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
            professionData: res.data ? res.data : {}
          })
        })
    },
    save(student) {
      return api
        .post('/student/save', {
          data: student,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = {...this.getState().data}
          data[student.config_enum_value_code] = res.data
          this.setField({
            data
          })
        })
    }
  }
})
