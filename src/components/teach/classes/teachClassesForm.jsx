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
      education_level: createFormField({
        value: props.data.education_level && props.data.education_level.split('|')
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
                <RadioGroup>
                  {
                    this.props.studyMode && this.props.studyMode.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
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
              {getFieldDecorator('subject_code')(
                <Input placeholder="请输入专业代码" />
              )}
            </FormItem>
            <FormItem label="专业名称">
              {getFieldDecorator('subject_name')(
                <Input placeholder="请输入专业代码" />
              )}
            </FormItem>
            <FormItem label="专业方向">
              {getFieldDecorator('subject_direction')(
                <Input placeholder="请输入专业方向" />
              )}
            </FormItem>
            <FormItem label="课程总门数">
              {getFieldDecorator('total_course')(
                <Input placeholder="请输入课程总门数" />
              )}
            </FormItem>
            <FormItem label="当年开设门数">
              {getFieldDecorator('open_total_course')(
                <Input placeholder="请输入当年开设门数" />
              )}
            </FormItem>
            <FormItem label="当年面授教学门数">
              {getFieldDecorator('face_to_face_total_course')(
                <Input placeholder="请输入当年面授教学门数" />
              )}
            </FormItem>
            <FormItem label="当年远程教学门数">
              {getFieldDecorator('remote_total_course')(
                <Input placeholder="请输入当年远程教学门数" />
              )}
            </FormItem>
            <FormItem label="当年混合教学门数">
              {getFieldDecorator('mix_total_course')(
                <Input placeholder="请输入当年混合教学门数" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
