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
      ...createFormFields(props.data)
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
            <FormItem label="年学费收入(万元)">
              {getFieldDecorator('tuition_income')(
                <Input placeholder="请输入年学费收入(万元)" />
              )}
            </FormItem>
            <FormItem label="其他收入(万元)">
              {getFieldDecorator('other_income')(
                <Input placeholder="请输入其他收入(万元)" />
              )}
            </FormItem>
            <FormItem label="学费上缴学校金额(万元)">
              {getFieldDecorator('tuition_handed')(
                <Input placeholder="请输入学费上缴学校金额(万元)" />
              )}
            </FormItem>
            <FormItem label="合作方分成金额(万元)">
              {getFieldDecorator('cooperator_obtain')(
                <Input placeholder="请输入合作方分成金额(万元)" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
