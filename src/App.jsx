import React, { Component } from 'react'
import style from 'styles/app'
import { smart, actions, withRouter, Routes } from 'cat-eye'
import { Spin } from 'antd'
import { USER_STATUS } from 'config/constant'
import Layout from 'components/layout'

class App extends Component {
  componentDidMount() {
    actions.user.startup()
  }
  render() {
    let content
    const { status } = this.props
    if (status === USER_STATUS.WAIT) {
      content = (
        <div className="waiting">
          <Spin />
          <div>拼命加载中...</div>
        </div>
      )
    } else if (status === USER_STATUS.LOGINED) {
      content = (
        <div className="root">
          <Layout>
            <div className={style.body}>
              <Routes />
            </div>
          </Layout>
        </div>
      )
    } else {
      content = (
        <div className="root">
          <Routes />
        </div>
      )
    }
    return content
  }
}

export default withRouter(
  smart(state => {
    return {
      status: state.user.status
    }
  })(App)
)
