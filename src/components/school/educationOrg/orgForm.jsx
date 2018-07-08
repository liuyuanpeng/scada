import React from 'react'
import { Modal, Form, Input, Checkbox, Radio } from 'antd'
import createFormFields from 'utils/createFormFields'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const createFormField = Form.createFormField

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...createFormFields(props.data),
      has_self_study_exam: createFormField({
        value: props.data.has_self_study_exam ? 'yes' : 'no'
      }),
      has_non_degree_education: createFormField({
        value: props.data.has_non_degree_education ? 'yes' : 'no'
      }),
      has_manage_department: createFormField({
        value: props.data.has_manage_department ? 'yes' : 'no'
      }),
      study_mode: createFormField({
        value: props.data.study_mode && props.data.study_mode.split('|')
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
            <FormItem label="办学机构名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入办学机构名称'
                  }]
              })(
                <Input placeholder="请输入办学机构名称" />
              )}
            </FormItem>
            <FormItem label="负责人姓名">
              {getFieldDecorator('master')(
                <Input placeholder="请输入负责人姓名" />
              )}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('telephone')(
                <Input placeholder="请输入联系电话" />
              )}
            </FormItem>
            <FormItem label="主要业务类型">
              {getFieldDecorator('study_mode')(
                <CheckboxGroup>
                  {this.props.studyMode && this.props.studyMode.map((item, index) => {
                    if (item && item.code !== 'STUDY_MODE_ALL') {
                      return <Checkbox key={`${index}`} value={item.code}>{item.name}</Checkbox>
                    }
                  })}
                </CheckboxGroup>
              )}
            </FormItem>
            <FormItem label="自学考试">
              {getFieldDecorator('has_self_study_exam')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="非学历培训">
              {getFieldDecorator('has_non_degree_education')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="归口管理部门">
              {getFieldDecorator('has_manage_department')(
                <RadioGroup>
                  <Radio value={'yes'}>有</Radio>
                  <Radio value={'no'}>无</Radio>
                </RadioGroup>
              )}
              {getFieldDecorator('manage_department_name')(
                <Input disabled={form.getFieldValue('has_manage_department') === 'no'} placeholder="请输入归口管理部门" />
              )}
            </FormItem>
          </Form>

        </Modal>
      )
    }
  }
)
