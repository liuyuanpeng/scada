import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'admin',
  state: {
    data: []
  },
  reducers: {},
  effects: {
    getData() {
      return api
        .get('/college/list', {
          complete: () => {
            this.setField({ loading: false })
          }
        })
        .then(res => {
          this.setField({
            data: res ? res.data : []
          })
        })
    },
    addCollege(data) {
      return api
        .post('/college/create', {
          data,
          complete: () => {
            this.setField({ loading: false })
          }
        })
        .then(res => {
          const data = this.getState().data.concat([{college: res.data}])
          this.setField({
            data
          })
        })
    },
    addUser(data) {
      return api
        .post('/user/create', {
          data,
          complete: () => {
            this.setField({ loading: false })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (item.college.id === res.data.maintain_id) {
              item.user = res.data
              break
            }
          }
          this.setField({
            data
          })
        })
    },
    resetUserPassword(userId) {
      return api
        .get('/user/reset-password', {
          params: {
            'user-id': userId
          },
          complete: () => {
            this.setField({ loading: false })
          }
        })
    },
    modifyUserEmail(data) {
      return api
        .post('/user/modify-email', {
          data: data,
          complete: () => {
            this.setField({ loading: false })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (item.college.id === res.data.maintain_id) {
              item.user = res.data
              break
            }
          }
          this.setField({
            data
          })
        })
    }
  }
})
