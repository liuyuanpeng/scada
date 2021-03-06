import ce, {
  request
} from 'cat-eye'
const {
  api
} = request

ce.model({
  name: 'openConfig', // 开放配置
  state: {
  },
  reducers: {},
  effects: {
    importConfigExcelData(formData) {
      // 导入一级配置excel表格
      return api
        .post('/open-config/import-config', {
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
    importConfigEnumExcelData(formData) {
      // 导入二级配置excel表格
      return api
        .post('/open-config/import-config-enum', {
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
    importConfigEnumValueExcelData(formData) {
      // 导入三级配置excel表格
      return api
        .post('/open-config/import-config-enum-value', {
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
    getMap() {
      // 获取所有配置映射列表
      // return api
      //   .get('/open-config/map', {
      //     complete: () => {
      //       this.setField({
      //         loading: false
      //       })
      //     }
      //   })
      //   .then(res => {
      //     this.setField({
      //       data: res ? res.data : []
      //     })
      //   })
    },
    getListByConfig({code, exCode}) {
      // 获取指定一级配置的配置结构列表(去除该一级配置下指定的二级配置，configCode详见本文件目录下open-config.md)
      if (this.getState().hasOwnProperty(code)) {
        return
      }
      return api
        .get('/open-config/list-by-config', {
          params: {
            'config-code': code,
            'exclude-config-enum-codes': exCode
          },
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let data = {}
          data[res.data.config.code] = res.data.config_enums.map(item => {
            if (item.config_enum_values && item.config_enum_values.length) {
              data[item.config_enum.code] = item.config_enum_values
            }
            return item.config_enum
          })
          this.setField({
            ...data
          })
        })
    }
  }
})
