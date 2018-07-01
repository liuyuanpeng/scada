import React from 'react'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title="添加学校"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          <Form layout="vertical">
            <FormItem label="学校代码">
              {getFieldDecorator('college_code', {
                rules: [
                  {
                    required: true, message: '请输入学校代码'
                  }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="学校名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入学校名称'
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
