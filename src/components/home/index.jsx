import React, { Component } from 'react'
import { smart, actions, Link, urlFor } from 'cat-eye'
import { Timeline, Tag } from 'antd'
import Feature from './Feature'
import Todo from './Todo'
import Bug from './Bug'
import style from './style'

const Home = props => {
  return (
    <div className="main">
      <Timeline>
        <Timeline.Item>
          <Tag color="red">todo list</Tag>
          <p>
            <Todo /> 例子：动态操作表单
          </p>
          <p>
            <Todo /> 例子：富文本编辑器组件
          </p>
          <p>
            <Todo /> 例子：经典多页增删改查
          </p>
          <p>
            <Todo /> 例子：地图组件
          </p>
          <p>
            <Todo /> 例子：图表组件
          </p>
          <p>
            <Todo /> 例子：占位组件
          </p>
          <p>
            <Todo /> 例子：剪切板组件
          </p>
          <p>
            <Todo /> ......
          </p>
        </Timeline.Item>
        <Timeline.Item>
          <Tag color="green">0.1.0</Tag>
          <Tag color="blue">2017年11月12日</Tag>
          <p>
            <Feature /> 后台基础架构
          </p>
          <p>
            <Feature /> 登录功能
          </p>
          <p>
            <Feature /> 路由 - 菜单 - 面包屑 自动适配
          </p>
          <p>
            <Feature /> 多域跨域解决方案
          </p>
          <p>
            <Feature /> 例子：经典单页增删改查
          </p>
          <p>
            <Feature /> 例子：多级路由
          </p>
          <p>
            <Feature /> 例子：多级菜单
          </p>
          <p>
            <Feature /> 例子：事件菜单
          </p>
          <p>
            <Feature /> 例子：外链菜单
          </p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

class Expire extends Component {
  constructor(props) {
    super(props)
    this.timer = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        token剩余过期时间: <span className={style.hot}>{parseInt((this.props.value - Date.now()) / 1000, 10)} </span>{' '}
        秒，
        <ul>
          <li>未过期：刷新保留登录状态，更新过期时间</li>
          <li>过期100秒内：刷新模拟重新登录，自动登录成功，更新过期时间</li>
          <li>过期超过100秒：刷新模拟重新登录，自动登录失败，进入登录界面</li>
        </ul>
      </div>
    )
  }
}

export default smart(
  state => {
    return {
      user: state.user
    }
  },
  props => {
    return {
      changeName() {
        let name = prompt('修改姓名:', props.user.name)
        if (name) {
          name = name.trim()
          if (name) {
            if (name.length > 16) {
              name = name.slice(0, 16)
            }
            actions.user.setField({ name })
          }
        }
      }
    }
  }
)(Home)
