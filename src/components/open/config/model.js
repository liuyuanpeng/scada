import ce, {
  request
} from 'cat-eye'
const {
  api
} = request

ce.model({
  name: 'config', // 开放配置
  state: {
    data: []
  },
  reducers: {},
  effects: {
    getList() {
      return api
        .get('/open-config/list-config', {
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
    save(config) {
      return api
        .post('/open-config/save-config', {
          data: config,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (config.create_user) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].code === config.code) {
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
  }
})
