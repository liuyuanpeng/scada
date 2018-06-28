import React from 'react'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item

export default Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onOK, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title={this.props.type === 'add' ? '新增' : '修改'}
          visible={visible}
          onOk={onOK}
          onCancel={onCancel}
        >
          <Form layout="vertical">
            <FormItem label="办学机构名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入办学机构名称'
                  }]
              })(
                <Input placeholder="请输入办学机构名称" />
              )}
            </FormItem>
            <FormItem label="负责人姓名">
              {getFieldDecorator('password')(
                <Input placeholder="请输入负责人姓名" />
              )}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('confirm')(
                <Input placeholder="请输入联系电话" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
