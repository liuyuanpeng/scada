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
      has_review: createFormField({
        value: props.data.has_review ? 'yes' : 'no'
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
            <FormItem label="中心/站点名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入中心/站点名称'
                  }]
              })(
                <Input placeholder="请输入中心/站点名称" />
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address')(
                <Input placeholder="请输入中心/站点名称" />
              )}
            </FormItem>
            <FormItem label="省厅审核备案">
              {getFieldDecorator('has_review')(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="当年省厅评估情况">
              {getFieldDecorator('evaluate_status')(
                <RadioGroup>
                  {
                    this.props.evaluateStatus && this.props.evaluateStatus.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="性质">
              {getFieldDecorator('center_nature')(
                <RadioGroup>
                  {
                    this.props.centerNature && this.props.centerNature.map((item, index) => {
                      return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
                    })
                  }
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="合作单位名称">
              {getFieldDecorator('cooperator_name')(
                <Input placeholder="请输入合作单位名称" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
