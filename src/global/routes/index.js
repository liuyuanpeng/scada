import React from 'react'
import { router, Redirect } from 'cat-eye'

// 组件引入
import NotFound from 'components/common/exception/404'
import Forbidden from 'components/common/exception/403'

import Login from 'components/login'
import Home from 'components/home'

// 路由引入
import manageRoutes from './manage'
import examplesRoutes from './examples'
import nestMenuRoutes from './nest-menu'
import schoolRoutes from './school'

import Admin from 'components/admin'

// 常量
const LOGIN_PATH = '/login'

/**
 * 路由配置，包括：
 *   注入 state
 *   默认组件配置，例如404，403
 */
router.config({
  mapStateToProps: state => {
    return {
      user: state.user,
      example: state.example
    }
  },
  components: {
    NotFound,
    Forbidden
  }
})

/**
 * 路由注册
 * path: 必须 {string}，路径
 * component: 可选 {Component}，路由对应的渲染组件
 * permission: 可选 {function}，权限验证函数，无表示不需要权限验证，子路由、平级子模块会继承权限
 * sub: 可选 {array} 子路由
 * index: 可选 {boolean} 是否作为父路由的默认显示
 * module: 可选 {array} 平级子模块
 * redirect: 可选 {string} 跳转到某个路由，不能与 sub 共存
 * exact: 可选 {boolean}是否完全匹配
 */
router.register({
  login: {
    path: LOGIN_PATH,
    component: Login,
    description: '登录页'
  },
  main: {
    path: '/',
    permission: props => {
      const user = props.user // eslint-disable-line
      if (user.accessToken) {
        return true
      }
      return <Redirect to={{ pathname: LOGIN_PATH }} />
    },
    module: {
      home: {
        component: Home,
        index: true,
        description: '首页'
      },
      manage: manageRoutes,
      menu: nestMenuRoutes,
      admin: {
        path: '/admin',
        component: Admin
      },
      school: schoolRoutes
    }
  },
  examples: examplesRoutes
})

console.log(router.getFlat())
