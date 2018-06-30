import Year from 'components/profession/year'
import Score from 'components/profession/score'

export default {
  path: '/',
  description: '专业设置',
  module: {
    year: {
      path: '/year',
      component: Year,
      description: '学年制'
    },
    score: {
      path: '/score',
      component: Score,
      description: '学分制'
    }
  }
}
