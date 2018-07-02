import React from 'react'
import { Modal, Form, Input, Checkbox, Radio, Select } from 'antd'
import createFormFields from 'utils/createFormFields'
import moment from 'moment'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const createFormField = Form.createFormField
const Option = Select.Option

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
            <FormItem label="一级代码">
              {getFieldDecorator('config_code')(
                <Input disabled />
              )}
            </FormItem>
            <FormItem label="二级代码">
              {getFieldDecorator('code')(
                <Input disabled />
              )}
            </FormItem>
            <FormItem label="二级代码名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入名称" />
              )}
            </FormItem>
            <FormItem label="二级代码说明">
              {getFieldDecorator('description')(
                <Input placeholder="请输入说明" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
