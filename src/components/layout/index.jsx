import React, { Component } from 'react'
import { Layout } from 'antd'
import Footer from 'components/common/footer'
import Logo from './Logo'
import Header from './Header'
import Menu from './Menu'
import Navigation from './Navigation'
import style from './style'
const { Content, Sider } = Layout

export default class extends Component {
  render() {
    return (
      <Layout className={style.layout}>
        <Sider className={style.sider} width="256">
          <Logo />
          <Menu />
        </Sider>
        <Layout>
          <Header />
          <Navigation />
          <Content className={style.main}>
            <div className={style.body}>{this.props.children}</div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
