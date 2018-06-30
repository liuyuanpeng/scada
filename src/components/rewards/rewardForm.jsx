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
            <FormItem label="项目名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入项目名称'
                  }]
              })(
                <Input placeholder="请输入项目名称" />
              )}
            </FormItem>
            <FormItem label="项目来源">
              {getFieldDecorator('source')(
                <Input placeholder="请输入项目来源" />
              )}
            </FormItem>
            <FormItem label="起讫时间">
              {getFieldDecorator('start_and_finish_time')(
                <Input placeholder="请输入起讫时间" />
              )}
            </FormItem>
            <FormItem label="获奖情况">
              {getFieldDecorator('awards')(
                <Input placeholder="请输入获奖情况" />
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
