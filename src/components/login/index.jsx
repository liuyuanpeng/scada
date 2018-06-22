import React from 'react'
import { Layout } from 'antd'
import { smart, Redirect, urlFor } from 'cat-eye'
import Header from './Header'
import LoginForm from './LoginForm'
import Footer from 'components/common/footer'
import style from './style'
import { USER_STATUS } from 'config/constant'
const { Content } = Layout

const Login = props => {
  // 已登录访问直接重定向首页
  if (props.user.status === USER_STATUS.LOGINED) {
    return (
      <Redirect
        to={urlFor('main', {
          age: 22,
          name: 33
        })}
      />
    )
  }
  return (
    <Layout className={style.main}>
      <Header />
      <Content className={style.body}>
        <LoginForm />
      </Content>
      <Footer />
    </Layout>
  )
}

export default smart(state => {
  const { name, password } = state.login
  return {
    name,
    password,
    user: state.user
  }
})(Login)
