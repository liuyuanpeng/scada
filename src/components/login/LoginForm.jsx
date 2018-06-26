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
    return (
      <div className={style.form}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入用户名' }]
            })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: false, message: '请输入密码' }]
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
            console.log('call then data: ', data)
            actions.login.setField({
              error: false
            })
            if (localStorage.getItem('role') === 'SUPER') {
              actions.routing.replace(urlFor('main.admin'))
            } else {
              actions.routing.replace(urlFor('main.basic'))
            }
          })
          .catch(data => {
            console.log('error%%%%%%%')
            actions.login.setField({
              error: true
            })
          })
      }
    }
  }
)(Form.create()(LoginForm))
