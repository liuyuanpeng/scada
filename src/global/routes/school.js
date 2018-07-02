import Basic from 'components/school/basic'
import EducationOrg from 'components/school/educationOrg'
import Rules from 'components/school/rules'

export default {
  path: '/',
  description: '学校基本信息',
  module: {
    basic: {
      path: '/basic',
      component: Basic,
      description: '基本信息'
    },
    educationOrg: {
      path: '/educationOrg',
      component: EducationOrg,
      description: '办学机构'
    },
    rules: {
      path: '/rules',
      component: Rules,
      description: '规章制度'
    }
  }
}
