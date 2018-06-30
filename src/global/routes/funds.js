import Tuition from 'components/funds/tuition'
import In from 'components/funds/in'
import Out from 'components/funds/out'

export default {
  path: '/',
  description: '经费情况',
  module: {
    tuition: {
      path: '/tuition',
      component: Tuition,
      description: '学费基本情况'
    },
    in: {
      path: '/in',
      component: In,
      description: '经费收入情况'
    },
    out: {
      path: '/out',
      component: Out,
      description: '经费支出情况'
    }
  }
}
