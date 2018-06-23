import ce, { actions, urlFor, request } from 'cat-eye'
import { USER_STATUS } from 'config/constant'
import md5 from 'md5'
const { api } = request

ce.model({
  name: 'user',
  state: {
    data: {
      name: localStorage.getItem('name')
    },
    accessToken: localStorage.getItem('accessToken'),
    expireAt: localStorage.getItem('expireAt'),
    status: USER_STATUS.WAIT
  },
  reducers: {},
  effects: {
    // 启动应用时调用，从localstorage读取token，进行自动登录
    startup() {
      const accessToken = localStorage.getItem('accessToken')
      let expireAt = localStorage.getItem('expireAt')

      const rediertToLogin = () => {
        this.setField({
          status: USER_STATUS.NOT_LOGIN
        })
        actions.routing.replace(urlFor('login'))
      }

      if (accessToken) {
        const now = Date.now() / 1000
        if (expireAt <= now) {
          // 已过期
          rediertToLogin()
        } else {
          // 未过期，调用重新登录，更新过期时间
          api
            .post('/auto_login', {
              customError: true
            })
            .then(data => {
              const { user, expire_at: expireAt } = data
              localStorage.setItem('expireAt', expireAt)
              this.setField({
                status: USER_STATUS.LOGINED,
                expireAt,
                data: user
              })
            })
            .catch(data => {
              rediertToLogin()
            })
        }
      } else {
        // 无token，需要重新登录
        rediertToLogin()
      }
    },
    // 登录
    login(data) {
      const { name, password } = data
      return api
        .post('/ceqas/session/login', {
          data: {
            username: name,
            password: md5(password)
          },
          customError: true
        })
        .then(data => {
          const { user, access_token: accessToken, expire_at: expireAt } = data
          localStorage.setItem('name', name)
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('expireAt', expireAt)
          this.setField({
            data: user,
            accessToken,
            expireAt,
            status: USER_STATUS.LOGINED
          })
        })
    },
    // 退出登录
    logout() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expireAt')
      localStorage.removeItem('name')
      localStorage.removeItem('openKeys')
      this.setField({
        accessToken: undefined,
        data: {},
        status: USER_STATUS.NOT_LOGIN
      })
      location.href = '/'
    }
  }
})
