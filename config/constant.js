/* global ENV */
/**
 * 系统全局常量
 */
export const ROLE = {
  ADMIN: 1,
  USER: 2
}

// 用户登录状态
export const USER_STATUS = {
  WAIT: 0, // 自动登录等待状态
  LOGINED: 1, // 已经登录
  NOT_LOGIN: 2, // 未登录
  RE_LOGIN: 3 // 需要重新登录，用于退出登录后刷新到登录页
}

// 版权信息
export const COPYRIGHT = 'Copyright © 2017-2018 gem-mine caolvchong@gmail.com'

// 左侧菜单模式，是否采用紧凑模式
export const MENU_KNIT = false

// 异常的一些常量
export const EXCEPTION = {
  403: {
    img: require('styles/images/403.png'),
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: require('styles/images/404.png'),
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  }
}
// 请根据 ENV（npm run xxx --env=yyy 得到的 env 值）来设置对应的key，例如下面的 dev、production
// local 是作为没有提供 ENV 时默认采用
const data = {
  // 本地配置
  local: {
    NAME: 'tom'
  },
  // 开发环境
  dev: {
    NAME: 'jerry'
  },
  // 生产环境
  production: {
    NAME: 'lucy'
  }
}

// 默认使用 local
const result = Object.assign({}, data[ENV || 'local'])
Object.keys(result).forEach(key => {
  exports[key] = result[key]
})
