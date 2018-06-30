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
            <FormItem label="教学人员(万元)">
              {getFieldDecorator('teacher_salary')(
                <Input placeholder="请输入教学人员(万元)" />
              )}
            </FormItem>
            <FormItem label="管理人员(万元)">
              {getFieldDecorator('manager_salary')(
                <Input placeholder="请输入管理人员(万元)" />
              )}
            </FormItem>
            <FormItem label="资源建设(万元)">
              {getFieldDecorator('resource_build_pay')(
                <Input placeholder="请输入资源建设(万元)" />
              )}
            </FormItem>
            <FormItem label="平台系统(万元)">
              {getFieldDecorator('platform_build_pay')(
                <Input placeholder="请输入平台系统(万元)" />
              )}
            </FormItem>
            <FormItem label="基础设施(万元)">
              {getFieldDecorator('base_build_pay')(
                <Input placeholder="请输入基础设施(万元)" />
              )}
            </FormItem>
            <FormItem label="年总支出(万元)">
              {getFieldDecorator('total_payout')(
                <Input placeholder="请输入年总支出(万元)" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
