import React from 'react'
import { Modal, Form, Input } from 'antd'
import createFormFields from 'utils/createFormFields'
const FormItem = Form.Item
const createFormField = Form.createFormField

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...createFormFields(props.data)
    }
  }
})(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title="编辑用户邮箱"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          <Form layout="vertical">
            <FormItem label="用户名">
              {getFieldDecorator('user', {
                rules: [
                  {
                    required: true, message: '请输入用户名'
                  }]
              })(
                <Input disabled />
              )}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true, message: '请输入邮箱'
                  }]
              })(
                <Input />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
