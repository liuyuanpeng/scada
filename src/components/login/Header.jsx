import React from 'react'
import { Layout } from 'antd'
import logo from 'styles/images/logo.png'
import style from './style'

const { Header } = Layout

export default props => {
  return (
    <Header className={style.header}>
      <div className={style.title}>
        <img src={logo} alt="ant design admin" />
        <span>系统管理</span>
      </div>
    </Header>
  )
}
