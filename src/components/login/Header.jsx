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
        <span>AntD Admin</span>
      </div>
      <p>乘风破浪会有时，直挂云帆济沧海</p>
    </Header>
  )
}
