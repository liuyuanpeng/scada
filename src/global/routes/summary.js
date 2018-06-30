import Basic from 'components/summary/basic'
import GenderAgeJob from 'components/summary/genderAgeJob'
import Profession from 'components/summary/profession'

export default {
  path: '/',
  description: '办学情况',
  module: {
    basic: {
      path: '/summary',
      component: Basic,
      description: '总体规模'
    },
    genderAgeJob: {
      path: '/genderAgeJob',
      component: GenderAgeJob,
      description: '性别年龄职业统计'
    },
    profession: {
      path: '/profession',
      component: Profession,
      description: '专业户籍统计'
    }
  }
}
