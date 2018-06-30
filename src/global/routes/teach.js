import Classes from 'components/teach/classes'
import Digits from 'components/teach/digits'
import Network from 'components/teach/network'
import ResStore from 'components/teach/resStore'

export default {
  path: '/',
  description: '教学资源',
  module: {
    classes: {
      path: '/classes',
      component: Classes,
      description: '课程情况'
    },
    digits: {
      path: '/digits',
      component: Digits,
      description: '数字资源应用情况'
    },
    network: {
      path: '/network',
      component: Network,
      description: '网络课程的应用情况'
    },
    resStore: {
      path: '/resStore',
      component: ResStore,
      description: '资源库应用情况'
    }
  }
}
