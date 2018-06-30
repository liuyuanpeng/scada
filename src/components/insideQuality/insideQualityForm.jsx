import React from 'react'
import { Modal, Form, Input, Checkbox, Radio } from 'antd'
import createFormFields from 'utils/createFormFields'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const createFormField = Form.createFormField

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...createFormFields(props.data),
      has_guarantee_dept: createFormField({
        value: props.data.has_guarantee_dept ? 'yes' : 'no'
      }),
      has_guarantee_regulation: createFormField({
        value: props.data.has_guarantee_regulation ? 'yes' : 'no'
      })
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
            <FormItem label="是否建立内部质量保证部门">
              {getFieldDecorator('has_guarantee_dept')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
              {getFieldDecorator('dept_name')(
                <Input disabled={form.getFieldValue('has_guarantee_dept') === 'no'} placeholder="请输入部门名称" />
              )}
            </FormItem>
            <FormItem label="是否建立内部质量管理制度">
              {getFieldDecorator('has_guarantee_regulation')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="记录时间">
              {getFieldDecorator('current_year', {
                rules: [
                  {
                    required: true, message: '请输入记录时间'
                  }]
              })(
                <Input placeholder="请输入记录时间" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
