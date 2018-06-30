import Basic from 'components/support/basic'
import Corp from 'components/support/corp'
import Study from 'components/support/study'
import Ways from 'components/support/ways'
import Requires from 'components/support/requires'

export default {
  path: '/',
  description: '软硬件建设',
  module: {
    basic: {
      path: '/basicSupport',
      component: Basic,
      description: '基本情况'
    },
    corp: {
      path: '/corp',
      component: Corp,
      description: '合作单位情况'
    },
    study: {
      path: '/study',
      component: Study,
      description: '校外学习中心'
    },
    ways: {
      path: '/ways',
      component: Ways,
      description: '支持服务的途径'
    },
    requires: {
      path: '/requires',
      component: Requires,
      description: '支持服务的要求'
    }
  }
}
