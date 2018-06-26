import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'main', // 经费收入情况
  state: {
    config: {}
  },
  reducers: {},
  effects: {
    getConfigMap() {
      return api
        .get('open-config/map')
        .then(res => {
          this.setField({
            config: res.data
          })
        })
    }
  }
})
