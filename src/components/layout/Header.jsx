import React from 'react'
import { actions, smart, Link, urlFor } from 'cat-eye'
import { Layout, Dropdown, Menu, Icon } from 'antd'
import style from './style'
// import avatar from 'styles/images/avatar.png'
const { Header } = Layout

const HeaderWrapper = props => {
  const menu = (
    <Menu className={style['account-menu']}>
      <Menu.Item>
        <div onClick={props.logout}>
          <Icon type="logout" /> 退出系统
        </div>
      </Menu.Item>
    </Menu>
  )
  console.log('props', props)
  return (
    <Header className={style.header}>
      <div className={style.right}>
        <Dropdown overlay={menu}>
          <div className={style.account}>
            <Icon type="user" style={{fontSize: '30px'}} />
            <span>{props.user.name}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

export default smart(
  state => {
    return {
      user: state.user.data
    }
  },
  props => {
    return {
      logout() {
        actions.user.logout()
      }
    }
  }
)(HeaderWrapper)
