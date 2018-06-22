import { ROLE } from 'config/constant'

import Account from 'components/manage/account'
import Article from 'components/manage/article'

export default {
  path: '/',
  description: '系统管理',
  permission: props => {
    const user = props.user.data
    return user.role === ROLE.ADMIN
  },
  module: {
    account: {
      path: '/accounts',
      component: Account,
      description: '用户管理'
    },
    article: {
      path: '/articles',
      component: Article,
      description: '文章管理'
    }
  }
}
