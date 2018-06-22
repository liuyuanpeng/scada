import React from 'react'
import style from './style'
import { COPYRIGHT } from 'config/constant'
import { Layout } from 'antd'
const Footer = Layout.Footer

export default props => {
  return (
    <Footer className={style.footer}>
      <div>{COPYRIGHT}</div>
    </Footer>
  )
}
