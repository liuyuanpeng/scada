import React from 'react'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        confirmDirty: false
      }
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value
      this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两个密码不一致!')
      } else {
        callback()
      }
    }

    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title="添加管理员"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          <Form layout="vertical">
            <FormItem label="用户名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入用户名'
                  }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(
                <Input />
              )}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    required: true, message: '请输入密码'
                  }]
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    validator: this.compareToFirstPassword
                  },
                  {
                    required: true, message: '请输入确认密码'
                  }]
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
