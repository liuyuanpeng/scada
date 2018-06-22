import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'account',
  state: {
    data: [],
    pagination: {},
    loading: false,
    params: {}
  },
  reducers: {},
  effects: {
    getData(params, getState) {
      params = Object.assign({ limit: 10, offset: 0 }, this.getState().params, params) // 获取参数
      this.setField({ loading: true, params }) // 设置 loading 与参数
      return api
        .get('/users', {
          params,
          complete: () => {
            this.setField({ loading: false })
          }
        })
        .then(list => {
          const { data, pagination } = list
          this.setField({
            data,
            pagination
          })
        })
    }
  }
})
