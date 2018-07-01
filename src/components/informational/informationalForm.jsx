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
      has_application: createFormField({
        value: props.data.has_application ? 'yes' : 'no'
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
            <FormItem label="信息化建设应用名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入信息化建设应用名称'
                  }]
              })(
                <Input placeholder="请输入信息化建设应用名称" />
              )}
            </FormItem>
            <FormItem label="状态(有无)">
              {getFieldDecorator('has_application')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="网址或服务名称(若该系统为非网络版本，在此栏填写“单机版”)">
              {getFieldDecorator('description')(
                <Input placeholder="请输入网址或服务名称" />
              )}
            </FormItem>
            <FormItem label="信息化建设项目来源">
              {getFieldDecorator('source')(
                <RadioGroup>
                  {
                    this.props.source && this.props.source.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
