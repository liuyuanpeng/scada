import ce, {
  request
} from 'cat-eye'
const {
  api
} = request

ce.model({
  name: 'schoolBasic', // 学校基本信息
  state: {
    data: {}
  },
  reducers: {},
  effects: {
    importExcelData(formData) {
      // 导入学校基本信息excel表格
      return api
        .post('/college/import', {
          headers: {
            'Content-Type': 'multipart/form-data' // 设置post文件的请求头
          },
          data: formData,
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
    getList() {
      // 获取学校基本信息列表
      return api
        .get('/college/list', {
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
    getByCollegeId() {
      // 获取学校基本信息 by college id
      const collegeId = localStorage.getItem('collegeId')
      return api
        .get('/college/id/' + collegeId, {
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
    getByCollegeCode(collegeCode) {
      // 获取学校基本信息 by college code
      return api
        .get('/college/code/' + collegeCode, {
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
    createCollege(college) {
      // 创建学校基本信息
      return api
        .post('/college/create', {
          data: college,
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
    saveCollege(college) {
      // 更新学校基本信息
      return api
        .put('/college/save', {
          data: college,
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
    }
  }
})
