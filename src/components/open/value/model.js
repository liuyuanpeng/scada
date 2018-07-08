import ce, {
  request
} from 'cat-eye'
const {
  api
} = request

ce.model({
  name: 'configEnumValue', // 开放配置
  state: {
  },
  reducers: {},
  effects: {
    getList() {
      return api
        .get('/open-config/list-config-enum-value', {
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
    save(configEnumValue) {
      return api
        .post('/open-config/save-config-enum-value', {
          data: configEnumValue,
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = this.getState().data.concat()
          if (configEnumValue.create_user) {
            // 修改
            for (let i = 0; i < data.length; i++) {
              if (data[i].code === configEnumValue.code) {
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
