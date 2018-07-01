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
      has_reference: createFormField({
        value: props.data.has_reference ? 'yes' : 'no'
      }),
      has_complaint: createFormField({
        value: props.data.has_complaint ? 'yes' : 'no'
      })
    }
  }
})(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        disableReferenceAnswerTime: true,
        disableComplaintAnswerTime: true
      }
    }

    onReferenceAnswerTimeChange = value => {
      this.setState({
        disableReferenceAnswerTime: value.target.value !== 'ANSWER_TIME_OTHER'
      })
    }

    onComplaintAnswerTimeChange = value => {
      this.setState({
        disableComplaintAnswerTime: value.target.value !== 'ANSWER_TIME_OTHER'
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
            <FormItem label="对学生咨询做出回应的时间规定(有无)">
              {getFieldDecorator('has_reference')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="咨询规定的回应时间">
              {getFieldDecorator('reference_answer_time')(
                <RadioGroup onChange={this.onReferenceAnswerTimeChange}>
                  {
                    this.props.referenceAnswerTime && this.props.referenceAnswerTime.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
              {getFieldDecorator('other_reference_answer_time')(
                <Input disabled={this.state.disableReferenceAnswerTime} placeholder={this.state.disableReferenceAnswerTime ? '' : '请输入其他咨询规定的回应时间'} />
              )
              }
            </FormItem>
            <FormItem label="对学生投诉做出回应的时间规定(有无)">
              {getFieldDecorator('has_complaint')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="投诉规定的回应时间">
              {getFieldDecorator('complaint_answer_time')(
                <RadioGroup onChange={this.onComplaintAnswerTimeChange}>
                  {
                    this.props.complaintAnswerTime && this.props.complaintAnswerTime.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
              {getFieldDecorator('other_complaint_answer_time')(
                <Input disabled={this.state.disableComplaintAnswerTime} placeholder={this.state.disableComplaintAnswerTime ? '' : '请输入其他投诉规定的回应时间'} />
              )
              }
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
