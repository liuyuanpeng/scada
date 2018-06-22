import Page1 from 'components/nest-menu/Page1'
import Page2 from 'components/nest-menu/Page2'

export default {
  path: '/nest-menu',
  description: '多级菜单示例',
  module: {
    page1: {
      path: '/page1',
      component: Page1
    },
    page2: {
      path: '/page2',
      component: Page2
    }
  }
}
