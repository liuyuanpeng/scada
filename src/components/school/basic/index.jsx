import React, { Component } from 'react'
import { smart, actions } from 'cat-eye'
import Page from 'components/common/page'
import { Form, Input, Button, Checkbox, Radio, message } from 'antd'
import createFormFields from 'utils/createFormFields'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const BasicForm = Form.create({
  mapPropsToFields(props) {
    return {
      ...createFormFields(props.data),
      education_level: Form.createFormField({
        value: props.data.education_level ? props.data.education_level.split('|') : []
      }),
      study_mode: Form.createFormField({
        value: props.data.study_mode ? props.data.study_mode.split('|') : []
      }),
      has_continue_education_strategy_plan: Form.createFormField({
        value: props.data.has_continue_education_strategy_plan ? 'yes' : 'no'
      }),
      is_continue_education_important_project: Form.createFormField({
        value: props.data.is_continue_education_important_project ? 'yes' : 'no'
      })
    }
  }
})(
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        disableOther: true
      }
    }
    componentWillMount() {
      actions.openConfig.getListByConfig({code: 'COLLEGE_BELONG'})
      actions.openConfig.getListByConfig({code: 'COLLEGE_NATURE'})
      actions.openConfig.getListByConfig({code: 'EDUCATION_LEVEL'})
      actions.openConfig.getListByConfig({code: 'STUDY_MODE'})
      actions.schoolBasic.getByCollegeId()
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          actions.schoolBasic.saveCollege({
            ...values,
            id: this.props.data.id,
            education_level: values.education_level.join('|'),
            study_mode: values.study_mode.join('|'),
            has_continue_education_strategy_plan: values.has_continue_education_strategy_plan === 'yes',
            is_continue_education_important_project: values.is_continue_education_important_project === 'yes'
          }).then(res => {
            message.info('修改成功')
          }).catch(e => {
            message.info('修改失败!')
          })
        }
      })
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.data.other_education_level) {
        this.setState({
          disableOther: false
        })
      }
    }

    onChange = (e) => {
      this.setState({
        disableOther: !e.target.checked
      })
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 10 }
      }
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
      const { getFieldDecorator } = this.props.form
      return (
        <Page>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="高校名称" {...formItemLayout}>
              {getFieldDecorator(
                'name',
                {rules: [
                  {
                    required: true,
                    message: '请输入高校名称'
                  }
                ]}
              )(
                <Input placeholder="请输入高校名称" />
              )
              }
            </FormItem>
            <FormItem label="高校代码" {...formItemLayout}>
              {getFieldDecorator(
                'college_code',
                {rules: [
                  {
                    required: true,
                    message: '请输入高校代码'
                  }
                ]}
              )(
                <Input placeholder="请输入高校代码" />
              )
              }
            </FormItem>
            <FormItem label="通讯地址" {...formItemLayout}>
              {getFieldDecorator(
                'address'
              )(
                <Input placeholder="请输入通讯地址" />
              )
              }
            </FormItem>
            <FormItem label="邮政编码" {...formItemLayout}>
              {getFieldDecorator(
                'email_code'
              )(
                <Input placeholder="请输入邮政编码" />
              )
              }
            </FormItem>
            <FormItem label="高校归属" {...formItemLayout}>
              {getFieldDecorator('college_belong')(
                <RadioGroup>
                  {this.props.collegeBelong && this.props.collegeBelong.map((item, index) => {
                    return <Radio key={`college_belong_${index}`} value={item.config_enum.code}>{item.config_enum.name}</Radio>
                  })}
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem label="高校性质" {...formItemLayout}>
              {getFieldDecorator('college_nature')(
                <RadioGroup>
                  {this.props.collegeNature && this.props.collegeNature.map((item, index) => {
                    return <Radio key={`college_nature_${index}`} value={item.config_enum.code}>{item.config_enum.name}</Radio>
                  })}
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem label="办学层次(可多选)" {...formItemLayout}>
              {getFieldDecorator('education_level')(
                <CheckboxGroup>
                  {this.props.educationLevel && this.props.educationLevel.map((item, index) => {
                    return <Checkbox key={`education_level_${index}`} value={item.config_enum.code}>{item.config_enum.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )
              }
              <Checkbox checked={!this.state.disableOther} onClick={this.onChange}>其他</Checkbox>
              {getFieldDecorator('other_education_level')(
                <Input disabled={this.state.disableOther} placeholder={this.state.disableOther ? '' : '请输入其他办学层次'} />
              )
              }
            </FormItem>
            <FormItem label="学习形式(可多选)" {...formItemLayout}>
              {getFieldDecorator('study_mode')(
                <CheckboxGroup>
                  {this.props.studyMode && this.props.studyMode.map((item, index) => {
                    return <Checkbox key={`study_mode_${index}`} value={item.config_enum.code}>{item.config_enum.name}</Checkbox>
                  })}
                </CheckboxGroup>
              )
              }
            </FormItem>
            <FormItem label="学校是否制定了专门的继续教育发展战略规划" {...formItemLayout}>
              {getFieldDecorator('has_continue_education_strategy_plan', {initialValue: 'no'})(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem label="学校是否将继续教育纳入学校双一流建设或其他重点建设工程项目" {...formItemLayout}>
              {getFieldDecorator('is_continue_education_important_project', {initialValue: 'no'})(
                <RadioGroup>
                  <Radio value={'yes'}>是</Radio>
                  <Radio value={'no'}>否</Radio>
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>
          </Form>
        </Page>
      )
    }
  }
)
export default smart(state => {
  return {
    data: state.schoolBasic.data,
    collegeBelong: state.openConfig.COLLEGE_BELONG,
    collegeNature: state.openConfig.COLLEGE_NATURE,
    educationLevel: state.openConfig.EDUCATION_LEVEL,
    studyMode: state.openConfig.STUDY_MODE
  }
})(BasicForm)
