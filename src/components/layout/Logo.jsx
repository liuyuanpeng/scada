import React from 'react'
import style from './style'
import logo from 'styles/images/logo.png'

export default props => {
  return (
    <div className={style.logo}>
      <img src={logo} />
      <h1>antd admin</h1>
    </div>
  )
}
