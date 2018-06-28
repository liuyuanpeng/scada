import React from 'react'
import { Modal, Form, Input, Checkbox, Radio } from 'antd'
import createFormFields from 'utils/createFormFields'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...createFormFields(props.data)
    }
  }
})(
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
            <FormItem label="制度名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入制度名称'
                  }]
              })(
                <Input placeholder="请输入制度名称" />
              )}
            </FormItem>
            <FormItem label="编制时间">
              {getFieldDecorator('make_time')(
                <Input placeholder="请输入编制时间" />
              )}
            </FormItem>
            <FormItem label="发文文号">
              {getFieldDecorator('reference_number')(
                <Input placeholder="请输入发文文号" />
              )}
            </FormItem>
            <FormItem label="拟新建管理制度名称">
              {getFieldDecorator('draft_name')(
                <Input placeholder="拟新建管理制度名称" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
