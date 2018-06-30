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
      enroll_student: createFormField({
        value: props.data.enroll_student && props.data.enroll_student.split('|')
      }),
      education_mode: createFormField({
        value: props.data.education_mode && props.data.education_mode.split('|')
      }),
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
            <FormItem label="非学历继续教育项目">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入非学历继续教育项目'
                  }]
              })(
                <Input placeholder="请输入非学历继续教育项目" />
              )}
            </FormItem>
            <FormItem label="招生方式">
              {getFieldDecorator('enroll_student')(
                <Input placeholder="请输入招生方式" />
              )}
            </FormItem>
            <FormItem label="面向人群">
              {getFieldDecorator('toward_crowd')(
                <Input placeholder="请输入面向人群" />
              )}
            </FormItem>
            <FormItem label="教学模式">
              {getFieldDecorator('education_mode')(
                <Input placeholder="请输入教学模式" />
              )}
            </FormItem>
            <FormItem label="年度总班次">
              {getFieldDecorator('total_class_number')(
                <Input placeholder="请输入年度总班次" />
              )}
            </FormItem>
            <FormItem label="年度总人数">
              {getFieldDecorator('total_student_number')(
                <Input placeholder="请输入年度总人数" />
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
