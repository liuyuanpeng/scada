let menus

export const generateMenus = () => {
  if (localStorage.getItem('role') === 'SUPER') {
    menus = [
      {
        name: '学校',
        icon: 'bars',
        url: 'main.admin'
      }
    ]
    menuCache = {}
    flatMenu = {}
    keyPath(menus)
    flat(menus)
    return
  }
  menus = [
    {
      name: '学校基本信息',
      icon: 'info-circle-o',
      sub: [
        {
          name: '基本信息',
          icon: 'table',
          url: 'main.school.basic'
        },
        {
          name: '办学机构',
          icon: 'table',
          url: 'main.school.educationOrg'
        }, {
          name: '规章制度',
          icon: 'table',
          url: 'main.school.rules'
        }
      ]
    },
    {
      name: '办学情况',
      icon: 'info-circle-o',
      sub: [
        {
          name: '总体规模',
          icon: 'table',
          url: 'main.summary.basic'
        },
        {
          name: '学生来源统计',
          icon: 'info-circle-o',
          sub: [
            {
              name: '性别年龄职业统计',
              icon: 'table',
              url: 'main.summary.genderAgeJob'
            },
            {
              name: '专业户籍统计',
              icon: 'table',
              url: 'main.summary.profession'
            }
          ]
        },
        // {
        //   name: '全日制教育与继续教育',
        //   icon: 'table',
        //   url: 'main.compare'
        // },
        {
          name: '专业设置',
          icon: 'info-circle-o',
          sub: [
            {
              name: '学年制',
              icon: 'table',
              url: 'main.profession.year'
            },
            {
              name: '学分制',
              icon: 'table',
              url: 'main.profession.score'
            }
          ]
        },
        {
          name: '教师情况',
          icon: 'info-circle-o',
          sub: [
            {
              name: '教师构成',
              icon: 'table',
              url: 'main.structure'
            }
          ]
        },
        {
          name: '教学资源',
          icon: 'info-circle-o',
          sub: [
            {
              name: '课程情况',
              icon: 'table',
              url: 'main.teach.classes'
            },
            {
              name: '数字资源应用情况',
              icon: 'table',
              url: 'main.teach.digits'
            },
            {
              name: '网络课程的应用情况',
              icon: 'table',
              url: 'main.teach.network'
            },
            {
              name: '资源库应用情况',
              icon: 'table',
              url: 'main.teach.resStore'
            }
          ]
        },
        {
          name: '软硬件建设',
          icon: 'info-circle-o',
          sub: [
            {
              name: '基本情况',
              icon: 'table',
              url: 'main.support.basic'
            },
            {
              name: '合作单位情况',
              icon: 'table',
              url: 'main.support.corp'
            },
            {
              name: '校外学习中心',
              icon: 'table',
              url: 'main.support.study'
            },
            {
              name: '支持服务的途径',
              icon: 'table',
              url: 'main.support.ways'
            },
            {
              name: '支持服务的要求',
              icon: 'table',
              url: 'main.support.requires'
            }
          ]
        },
        {
          name: '信息化建设情况',
          icon: 'table',
          url: 'main.informational'
        },
        {
          name: '经费情况',
          icon: 'info-circle-o',
          sub: [
            {
              name: '学费基本情况',
              icon: 'table',
              url: 'main.funds.tuition'
            },
            {
              name: '经费收入情况',
              icon: 'table',
              url: 'main.funds.in'
            },
            {
              name: '经费支出情况',
              icon: 'table',
              url: 'main.funds.out'
            }
          ]
        },
        {
          name: '内部质量保证',
          icon: 'table',
          url: 'main.insideQuality'
        },
        {
          name: '接受外部质量评估',
          icon: 'table',
          url: 'main.outsideQuality'
        },
        {
          name: '学生学习效果',
          icon: 'table',
          url: 'main.studyEffect'
        }
      ]
    },
    {
      name: '非学历继续教育基本情况',
      icon: 'table',
      url: 'main.informEducation'
    },
    {
      name: '继续教育获奖及立项情况',
      icon: 'table',
      url: 'main.rewards'
    }
  ]
  menuCache = {}
  flatMenu = {}
  keyPath(menus)
  flat(menus)
}

export let menuCache = {}

export let flatMenu = {}
function flat(arr) {
  arr.forEach(item => {
    const url = item.url
    if (url && !/https?:/.test(url)) {
      flatMenu[url] = item
    }
    if (item.sub) {
      flat(item.sub)
    }
  })
}

export const getFlatMenu = () => {
  if (Object.keys(flatMenu).length) {
    return flatMenu
  }
  generateMenus()
  return flatMenu
}

// 给菜单的每个项生成 keyPath，规则是使用数组下标
function keyPath(arr, parent) {
  arr.forEach((item, index) => {
    if (parent) {
      item.keyPath = parent.keyPath.concat(index)
    } else {
      item.keyPath = [index]
    }
    menuCache[item.keyPath.join('-')] = item
    if (item.sub) {
      keyPath(item.sub, item)
    }
  })
}

export const getMenu = () => {
  generateMenus()
  return menus
}

export default menus
