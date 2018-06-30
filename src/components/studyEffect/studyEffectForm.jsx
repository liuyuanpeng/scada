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
          </Form>

        </Modal>
      )
    }
  }
)
