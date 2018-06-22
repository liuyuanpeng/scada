import React, { Component } from 'react'
import { Form, Icon, Input, Button, Alert } from 'antd'
import { smart, actions, urlFor } from 'cat-eye'
import style from './style'
const FormItem = Form.Item

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values)
      }
    })
  }
  render() {
    const props = this.props
    const { getFieldDecorator } = props.form
    let error
    if (props.error) {
      error = (
        <div className={style.error}>
          <Alert message="账号或密码错误" type="error" showIcon />
        </div>
      )
    }
    return (
      <div className={style.form}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {error}
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名' }]
            })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={style.submit}>
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default smart(
  state => {
    return {
      error: state.login.error
    }
  },
  props => {
    return {
      submit(data) {
        const { name, password } = data
        actions.user
          .login({
            name,
            password
          })
          .then(data => {
            actions.login.setField({
              error: false
            })
            actions.routing.replace(urlFor('main'))
          })
          .catch(data => {
            actions.login.setField({
              error: true
            })
          })
      }
    }
  }
)(Form.create()(LoginForm))
