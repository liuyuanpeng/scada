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
import openRoutes from './open'
import schoolRoutes from './school'
import informEducation from './informEducation'
import rewardsRoutes from './rewards'
import summaryRoutes from './summary'
import professionRoutes from './profession'
import teachRoutes from './teach'
import supportRoutes from './support'
import fundsRoutes from './funds'

import Compare from 'components/compare'
import Structure from 'components/structure'
import Informational from 'components/informational'
import InsideQuality from 'components/insideQuality'
import OutsideQuality from 'components/outsideQuality'
import StudyEffect from 'components/studyEffect'

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
      open: openRoutes,
      summary: summaryRoutes,
      school: schoolRoutes,
      compare: {
        path: '/compare',
        component: Compare
      },
      profession: professionRoutes,
      structure: {
        path: '/structure',
        component: Structure
      },
      teach: teachRoutes,
      support: supportRoutes,
      informational: {
        path: '/informational',
        component: Informational
      },
      funds: fundsRoutes,
      insideQuality: {
        path: '/insideQuality',
        component: InsideQuality
      },
      outsideQuality: {
        path: '/outsideQuality',
        component: OutsideQuality
      },
      studyEffect: {
        path: '/studyEffect',
        component: StudyEffect
      },
      informEducation: informEducation,
      rewards: rewardsRoutes
    }
  },
  examples: examplesRoutes
})

// console.log(router.getFlat())
