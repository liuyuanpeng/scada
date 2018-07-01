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
      study_mode: createFormField({
        value: props.data.study_mode && props.data.study_mode.split('|')
      }),
      education_level: createFormField({
        value: props.data.education_level && props.data.education_level.split('|')
      }),
      is_college_special: createFormField({
        value: props.data.is_college_special ? 'yes' : 'no'
      }),
      is_province_special: createFormField({
        value: props.data.is_province_special ? 'yes' : 'no'
      })
    }
  }
})(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        disableEducationLevel: true
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.data.other_education_level) {
        this.setState({
          disableEducationLevel: false
        })
      }
    }

    onEducationLevelChange = value => {
      this.setState({
        disableEducationLevel: value.findIndex(item => item === 'EDUCATION_LEVEL_OTHER') === -1
      })
    }

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
            <FormItem label="类型">
              {getFieldDecorator('study_mode')(
                <CheckboxGroup>
                  {this.props.studyMode && this.props.studyMode.map((item, index) => {
                    return <Checkbox key={`${index}`} value={item.code}>{item.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )}
            </FormItem>
            <FormItem label="培养层次">
              {getFieldDecorator('education_level')(
                <CheckboxGroup onChange={this.onEducationLevelChange}>
                  {this.props.educationLevel && this.props.educationLevel.map((item, index) => {
                    return <Checkbox key={`education_level_${index}`} value={item.code}>{item.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )
              }
              {getFieldDecorator('other_education_level')(
                <Input disabled={this.state.disableEducationLevel} placeholder={this.state.disableEducationLevel ? '' : '请输入其他培养层次'} />
              )
              }
            </FormItem>
            <FormItem label="专业代码">
              {getFieldDecorator('subject_code', {
                rules: [
                  {
                    required: true, message: '请输入专业代码'
                  }]
              })(
                <Input placeholder="请输入专业代码" />
              )}
            </FormItem>
            <FormItem label="专业名称">
              {getFieldDecorator('subject_name', {
                rules: [
                  {
                    required: true, message: '请输入专业名称'
                  }]
              })(
                <Input placeholder="请输入专业名称" />
              )}
            </FormItem>
            <FormItem label="专业方向">
              {getFieldDecorator('subject_direction')(
                <Input placeholder="请输入专业方向" />
              )}
            </FormItem>
            <FormItem label="学制">
              {getFieldDecorator('study_year')(
                <Input placeholder="请输入学制" />
              )}
            </FormItem>
            <FormItem label="总学时要求">
              {getFieldDecorator('total_study_time')(
                <Input placeholder="请输入总学时要求" />
              )}
            </FormItem>
            <FormItem label="选修课学时要求">
              {getFieldDecorator('selective_study_time')(
                <Input placeholder="请输入选修课学时要求" />
              )}
            </FormItem>

            <FormItem label="实践教学学时要求">
              {getFieldDecorator('practice_study_time')(
                <Input placeholder="请输入当年实践教学学时要求" />
              )}
            </FormItem>
            <FormItem label="是否为校级特色专业">
              {getFieldDecorator('is_college_special', {initialValue: this.props.educationCategory ? this.props.educationCategory[0].code : ''})(
                <RadioGroup>
                  <Radio value="yes">是</Radio>
                  <Radio value="no">否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="是否为省级特色专业">
              {getFieldDecorator('is_province_special', {initialValue: this.props.educationCategory ? this.props.educationCategory[0].code : ''})(
                <RadioGroup>
                  <Radio value="yes">是</Radio>
                  <Radio value="no">否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)
