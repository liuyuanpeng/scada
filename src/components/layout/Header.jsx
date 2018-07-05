import React, { Component } from 'react'
import { actions, smart, Link, urlFor, request } from 'cat-eye'
import { Layout, Dropdown, Menu, Icon, Avatar, message } from 'antd'
import style from './style'
import UserInfoForm from './userInfoForm'
const { Header } = Layout
const { api } = request

class HeaderWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modifyUserInfo: false,
      user: this.props.user,
      userInfo: {}
    }
  }
  
  componentWillMount() {
    this.getUserInfo()
  }
  
  getUserInfo = () => {
    return api
        .get('/user/' + this.state.user.userId)
        .then(res => {
          this.setState({
            userInfo: res ? res.data : {}
          })
        })
  }
  
  logout = () => {
    actions.user.logout()
  }
  
  onModifyUserInfo = () => {
    this.setState({
      modifyUserInfo: true,
      userInfo: this.state.userInfo
    })
  }

  handleCancel = () => {
    this.setState({
      modifyUserInfo: false
    })
  }
  
  handleModifyUserInfo = () => {
    const form = this.userInfoFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      api.post('/user/modify-email', {
          data: {
            id: this.state.user.userId,
            email: values.email
          }
        })
        .then(res => {
          this.setState({
            userInfo: res ? res.data : this.state.userInfo
          })
          message.info('操作成功!')
        })
        .catch(e => {
          message.error('操作失败!')
        })
      form.resetFields()
      this.setState({ modifyUserInfo: false })
    })
  }
  
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }
  
  modifyUserInfoFormRef = (formRef) => {
    this.userInfoFormRef = formRef
  }

  render() {
    const menu = (
      <Menu className={style['account-menu']}>
        <Menu.Item>
          <div onClick={this.logout}>
            <Icon type="logout" style={{ fontSize: 15, color: '#08c' }} /> 退出系统
          </div>
        </Menu.Item>
      </Menu>
    )
    
    return (
      <Header className={style.header}>
        <div className={style.right}>
          <Dropdown overlay={menu}>
            <div className={style.account} onClick={this.onModifyUserInfo}>
              <Avatar style={{ backgroundColor: '#021628', marginRight: 15 }} icon="user" size='large' shape='square' />
              <span>{this.state.user.name}</span>
            </div>
          </Dropdown>
        </div>
        <UserInfoForm
            wrappedComponentRef={this.modifyUserInfoFormRef}
            visible={this.state.modifyUserInfo}
            data={this.state.userInfo}
            onCancel={this.handleCancel}
            onCreate={this.handleModifyUserInfo}
        />
      </Header>
    )
  }
}

export default smart(state => {
  return {
    user: state.user.data
  }
})(HeaderWrapper)
