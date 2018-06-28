import { request, setIn, getIn } from 'cat-eye'
import proxyConfig from 'config/proxy'
import { message } from 'antd'
import { getCurrentProxyConfig } from 'global/util/sys'

// 获取环境中对应的网络配置
request.init(getCurrentProxyConfig(proxyConfig))

// 全局设置，对所有请求生效
request.config({
  verify: function (data) {
    if (data.data.code !== 'SUCCESS') {
      message.error(data.data.message)
      return false
    }
    return data.status === 200
  },
  loading: function (params) {
    this.hideTip = message.loading('请求仍在进行，请稍候...', 15)
  },
  error: function (res) {
    let msg = getIn(res, 'data.meta.message') || '您的请求遇到了错误，请稍候再试'
    message.error(msg, 5)
  },
  complete: function (res) {
    if (this.hideTip) {
      this.hideTip()
    }
  }
})

// 某个域请求设置
request.api.config({
  before: function (params) {
    const auth = getIn(params, 'headers.token')
    if (!auth) {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        return setIn(params, {
          'headers.token': accessToken
        })
      }
    }
    return params
  }
})
