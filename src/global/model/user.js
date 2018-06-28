import ce, { actions, urlFor, request } from 'cat-eye'
import { USER_STATUS } from 'config/constant'
import md5 from 'md5'
import { generateMenus } from '../menu'
const { api } = request

ce.model({
  name: 'user',
  state: {
    data: {
      name: localStorage.getItem('name')
    },
    accessToken: localStorage.getItem('accessToken'),
    expires: localStorage.getItem('expires'),
    status: USER_STATUS.WAIT,
    role: localStorage.getItem('role'),
    createTime: localStorage.getItem('createTime'),
    collegeId: localStorage.getItem('collegeId')
  },
  reducers: {},
  effects: {
    // 启动应用时调用，从localstorage读取token，进行自动登录
    startup() {
      const accessToken = localStorage.getItem('accessToken')
      const expires = localStorage.getItem('expires')
      const createTime = localStorage.getItem('createTime')

      const rediertToLogin = () => {
        this.setField({
          status: USER_STATUS.NOT_LOGIN
        })
        actions.routing.replace(urlFor('login'))
      }

      if (accessToken) {
        const now = Date.now()
        if (parseInt(createTime) + parseInt(expires) * 1000 <= now) {
          // 已过期
          rediertToLogin()
        } else {
          // 未过期，调用重新登录，更新过期时间
          this.setField({
            status: USER_STATUS.LOGINED
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
        .post('/session/login', {
          data: {
            username: name,
            password: md5(password)
          },
          customError: true
        })
        .then(data => {
          const { username, role } = data.data.user
          const { token, expires } = data.data.user_session
          localStorage.setItem('name', username)
          localStorage.setItem('accessToken', token)
          localStorage.setItem('expires', expires)
          localStorage.setItem('role', role)
          localStorage.setItem('createTime', data.data.user_session.create_time)
          localStorage.setItem('collegeId', data.data.college.id)
          generateMenus()
          this.setField({
            data: { name: username },
            role,
            accessToken: token,
            expires: expires,
            status: USER_STATUS.LOGINED,
            createTime: data.data.user_session.create_time,
            collegeId: data.data.college.id
          })
        })
    },
    // 退出登录
    logout() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expires')
      localStorage.removeItem('createTime')
      localStorage.removeItem('name')
      localStorage.removeItem('role')
      localStorage.removeItem('openKeys')
      localStorage.removeItem('collegeId')
      this.setField({
        accessToken: undefined,
        data: {},
        status: USER_STATUS.NOT_LOGIN,
        role: undefined,
        expires: undefined,
        createTime: undefined,
        collegeId: undefined
      })
      location.href = '/'
    }
  }
})
