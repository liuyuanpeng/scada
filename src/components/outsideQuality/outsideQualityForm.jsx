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
      quality_evaluate: createFormField({
        value: props.data.quality_evaluate && props.data.quality_evaluate.split('|')
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
            <FormItem label="接受外部评估的类型">
              {getFieldDecorator('quality_evaluate')(
                <CheckboxGroup>
                  {this.props.qualityEvaluate && this.props.qualityEvaluate.map((item, index) => {
                    return <Checkbox key={`${index}`} value={item.code}>{item.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )}
            </FormItem>
            <FormItem label="频率(x次x年)">
              {getFieldDecorator('rate')(
                <Input placeholder="请输入频率x次x年" />
              )}
            </FormItem>
            <FormItem label="效果(优秀、良好等)">
              {getFieldDecorator('effect')(
                <Input placeholder="请输入效果(优秀、良好等)" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
