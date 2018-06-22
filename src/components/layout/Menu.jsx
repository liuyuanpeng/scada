import React from 'react'
import { urlFor, Link, smart, actions } from 'cat-eye'
import { Menu, Icon } from 'antd'
import style from './style'
import menus from 'global/menu'
const SubMenu = Menu.SubMenu

const menuCache = {}

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

keyPath(menus)

function generateMenu(menus) {
  return menus.map(item => {
    const icon = item.icon ? <Icon type={item.icon} /> : undefined
    if (item.sub) {
      return (
        <SubMenu
          key={item.keyPath.join('-')}
          title={
            <div>
              {icon}
              {item.name}
            </div>
          }
        >
          {generateMenu(item.sub)}
        </SubMenu>
      )
    } else {
      let content
      const url = item.url
      if (item.action) {
        content = (
          <div>
            {icon}
            {item.name}
          </div>
        )
      } else {
        if (/^https?:/.test(url)) {
          content = (
            <a href={item.url} target="_blank">
              {icon}
              {item.name}
            </a>
          )
        } else {
          content = (
            <Link to={urlFor(item.url)}>
              {icon}
              {item.name}
            </Link>
          )
        }
      }
      return <Menu.Item key={item.keyPath.join('-')}>{content}</Menu.Item>
    }
  })
}

const Menus = props => {
  let openKeys = []
  let selectedKeys
  const menu = props.menu
  if (menu && menu.length) {
    const last = menu[menu.length - 1]
    selectedKeys = [last.keyPath.join('-')]
  } else {
    selectedKeys = ['0']
  }

  return (
    <div className={style.menu}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={props.setNavigation}
        openKeys={props.openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={props.setMenu}
      >
        {generateMenu(menus)}
      </Menu>
    </div>
  )
}

export default smart(
  state => {
    return {
      openKeys: state.navigation.openKeys,
      menu: state.navigation.menu
    }
  },
  props => {
    return {
      setNavigation({ item, key }) {
        const menu = menuCache[key]
        if (menu.action) {
          menu.action(item, key, menu)
          return false
        } else if (/^https?:/.test(menu.url)) {
          return false
        }
        actions.navigation.setMenu({
          keyPath: key.split('-')
        })
      },
      setMenu(openKeys) {
        actions.navigation.setOpenKeys(openKeys)
      }
    }
  }
)(Menus)
