import ce, {
  request
} from 'cat-eye'
const {
  api
} = request

ce.model({
  name: 'configEnum', // 开放配置
  state: {
  },
  reducers: {},
  effects: {
    getList() {
      return api
        .get('/open-config/list-config-enum', {
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
    save(configEnum) {
      return api
        .put('/open-config/update-config-enum', {
          data: configEnum,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (configEnum.code) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].code === configEnum.code) {
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
