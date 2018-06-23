import React from 'react'
import { Modal } from 'antd'

// 菜单配置
export default [
  {
    name: '学校',
    icon: 'bars',
    url: 'main.admin.school'
  },
  {
    name: '用户',
    icon: 'user',
    url: 'main.admin.user'
  },
  {
    name: '后台管理',
    icon: 'setting',
    sub: [
      {
        name: '用户管理',
        icon: 'team',
        url: 'main.manage.account'
      },
      {
        name: '文章管理',
        icon: 'book',
        url: 'main.manage.article'
      }
    ]
  },
  {
    name: '基础使用',
    icon: 'code',
    sub: [
      {
        name: '各式菜单',
        icon: 'appstore',
        sub: [
          {
            name: '多级菜单',
            icon: 'bars',
            sub: [
              {
                name: '四级菜单 - 1',
                icon: 'smile',
                url: 'main.menu.page1'
              },
              {
                name: '四级菜单 - 2',
                icon: 'frown',
                url: 'main.menu.page2'
              }
            ]
          },
          {
            name: '事件菜单',
            icon: 'scan',
            action(e) {
              Modal.success({
                title: '事件菜单',
                content: <div>响应菜单点击事件</div>
              })
            }
          },
          {
            name: '外链菜单',
            icon: 'link',
            url: 'https://www.baidu.com'
          }
        ]
      },
      {
        name: '嵌套 gem-mine 例子',
        icon: 'share-alt',
        url: 'examples'
      }
    ]
  }
]
