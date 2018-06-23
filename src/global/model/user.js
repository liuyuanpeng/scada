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
    status: USER_STATUS.WAIT,
    role: localStorage.getItem('role')
  },
  reducers: {},
  effects: {
    // 启动应用时调用，从localstorage读取token，进行自动登录
    startup() {
      // const accessToken = localStorage.getItem('accessToken')
      // let expireAt = localStorage.getItem('expireAt')

      const rediertToLogin = () => {
        this.setField({
          status: USER_STATUS.NOT_LOGIN
        })
        actions.routing.replace(urlFor('login'))
      }

      rediertToLogin()

      // if (accessToken) {
      //   const now = Date.now() / 1000
      //   if (expireAt <= now) {
      //     // 已过期
      //     rediertToLogin()
      //   } else {
      //     // 未过期，调用重新登录，更新过期时间
      //     api
      //       .post('/auto_login', {
      //         customError: true
      //       })
      //       .then(data => {
      //         const { user, expire_at: expireAt } = data
      //         localStorage.setItem('expireAt', expireAt)
      //         this.setField({
      //           status: USER_STATUS.LOGINED,
      //           expireAt,
      //           data: user
      //         })
      //       })
      //       .catch(data => {
      //         rediertToLogin()
      //       })
      //   }
      // } else {
      //   // 无token，需要重新登录
      //   rediertToLogin()
      // }
    },
    // 登录
    login(data) {
      const { name, password } = data
      return api
        .post('/ceqas/session/login', {
          data: {
            username: 'chenxun',
            password: md5('123456')
          },
          customError: true
        })
        .then(data => {
          console.log('data: ', data)
          const { username, role } = data.data.user
          const { token, expires } = data.data.user_session
          localStorage.setItem('name', username)
          localStorage.setItem('accessToken', token)
          localStorage.setItem('expireAt', expires)
          localStorage.setItem('role', role)
          this.setField({
            data: {name: username},
            role,
            accessToken: token,
            expireAt: expires,
            status: USER_STATUS.LOGINED
          })
        })
    },
    // 退出登录
    logout() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expireAt')
      localStorage.removeItem('name')
      localStorage.removeItem('role')
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
