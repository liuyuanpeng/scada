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
      has_telephone: createFormField({
        value: props.data.has_telephone ? 'yes' : 'no'
      }),
      has_QQ: createFormField({
        value: props.data.has_QQ ? 'yes' : 'no'
      }),
      has_Discuss: createFormField({
        value: props.data.has_Discuss ? 'yes' : 'no'
      }),
      has_email: createFormField({
        value: props.data.has_email ? 'yes' : 'no'
      }),
      has_face_to_face_teach: createFormField({
        value: props.data.has_face_to_face_teach ? 'yes' : 'no'
      }),
      has_online_teach: createFormField({
        value: props.data.has_online_teach ? 'yes' : 'no'
      }),
      has_wechat: createFormField({
        value: props.data.has_wechat ? 'yes' : 'no'
      }),
      has_other: createFormField({
        value: props.data.has_other ? 'yes' : 'no'
      })
    }
  }
})(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        disableOtherServiceName: true
      }
    }

    onDisableOtherServiceNameChange = value => {
      this.setState({
        disableOtherServiceName: value.target.value === 'no'
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
            <FormItem label="热线电话">
              {getFieldDecorator('has_telephone')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="QQ群">
              {getFieldDecorator('has_QQ')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="论坛">
              {getFieldDecorator('has_Discuss')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="电子邮箱">
              {getFieldDecorator('has_email')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="面授辅导">
              {getFieldDecorator('has_face_to_face_teach')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="在线实时辅导">
              {getFieldDecorator('has_online_teach')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="微信群">
              {getFieldDecorator('has_wechat')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="其他">
              {getFieldDecorator('has_other')(
                <RadioGroup onChange={this.onDisableOtherServiceNameChange}>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
              {getFieldDecorator('other_service_name')(
                <Input disabled={this.state.disableOtherServiceName} placeholder={this.state.disableOtherServiceName ? '' : '请输入其他服务名称'} />
              )
              }
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
