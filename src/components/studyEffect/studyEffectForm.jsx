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
      has_student_satisfaction_survey: createFormField({
        value: props.data.has_student_satisfaction_survey ? 'yes' : 'no'
      }),
      is_student_survey_period_fix: createFormField({
        value: props.data.is_student_survey_period_fix ? 'yes' : 'no'
      }),
      has_company_satisfaction_survey: createFormField({
        value: props.data.has_company_satisfaction_survey ? 'yes' : 'no'
      }),
      is_company_survey_period_fix: createFormField({
        value: props.data.is_company_survey_period_fix ? 'yes' : 'no'
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
            <FormItem label="是否开展学生满意度调查">
              {getFieldDecorator('has_student_satisfaction_survey')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="学生满意度调查周期">
              {getFieldDecorator('is_student_survey_period_fix')(
                <RadioGroup>
                  <Radio value={'yes'}>定期</Radio>
                  <Radio value={'no'}>不定期</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="是否开展社会用人单位对毕业生的反馈评价调查">
              {getFieldDecorator('has_company_satisfaction_survey')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="社会用人单位对毕业生的反馈评价周期">
              {getFieldDecorator('is_company_survey_period_fix')(
                <RadioGroup>
                  <Radio value={'yes'}>定期</Radio>
                  <Radio value={'no'}>不定期</Radio>
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
