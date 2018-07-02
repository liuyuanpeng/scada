import Config from 'components/open/config'
import Enum from 'components/open/enum'
import Value from 'components/open/value'

export default {
  path: '/',
  description: '开放配置',
  module: {
    config: {
      path: '/config',
      component: Config,
      description: '一级配置'
    },
    enum: {
      path: '/enum',
      component: Enum,
      description: '二级配置'
    },
    value: {
      path: '/value',
      component: Value,
      description: '三级配置'
    }
  }
}
