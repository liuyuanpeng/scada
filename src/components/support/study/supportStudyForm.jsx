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
            <FormItem label="年份">
              {getFieldDecorator('current_year', {initialValue: `${moment().year()}`})(
                <Select>
                  {
                    this.props.years && this.props.years.map((item, index) => {
                      return <Option key={`${index}`} value={item}>{`${item} 年`}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入名称'
                  }]
              })(
                <Input placeholder="请输入名称" />
              )}
            </FormItem>
            <FormItem label="授权中心数">
              {getFieldDecorator('authorize_center_number')(
                <Input placeholder="请输入授权中心数" />
              )}
            </FormItem>
            <FormItem label="当年省厅评估不合格数(限期整改)">
              {getFieldDecorator('evaluate_not_pass_number')(
                <Input placeholder="请输入当年省厅评估不合格数" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
