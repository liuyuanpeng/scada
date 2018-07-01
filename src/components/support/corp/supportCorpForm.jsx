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
      has_qualify: createFormField({
        value: props.data.has_qualify ? 'yes' : 'no'
      }),
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
            <FormItem label="合作单位名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入合作单位名称'
                  }]
              })(
                <Input placeholder="请输入合作单位名称" />
              )}
            </FormItem>
            <FormItem label="合作单位性质">
              {getFieldDecorator('center_cooperator_nature')(
                <RadioGroup>
                  {
                    this.props.cooperatorNature && this.props.cooperatorNature.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="是否具有办学资格">
              {getFieldDecorator('has_qualify')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="合作单位办学层次">
              {getFieldDecorator('education_level')(
                <CheckboxGroup onChange={this.onEducationLevelChange}>
                  {this.props.educationLevel && this.props.educationLevel.map((item, index) => {
                    return <Checkbox key={`education_level_${index}`} value={item.code}>{item.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )
              }
              {getFieldDecorator('other_education_level')(
                <Input disabled={this.state.disableEducationLevel} placeholder={this.state.disableEducationLevel ? '' : '请输入其他办学层次'} />
              )
              }
            </FormItem>
            <FormItem label="合作开始年份">
              {getFieldDecorator('start_cooperate_year')(
                <Input placeholder="请输入合作开始年份" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
