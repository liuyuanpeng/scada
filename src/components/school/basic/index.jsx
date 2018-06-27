import React, { Component } from 'react'
import { smart, actions } from 'cat-eye'
import Page from 'components/common/page'
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

const COLLEGE_BELONGS = [
  '中央部署高校',
  '省属/市属院校',
  '(地级)市属院校',
  '企业部属院校'
]

const COLLEGE_NATURES = [
  '普通本科高校',
  '高职高专院校',
  '独立设置成人高校(除电)',
  '广播电视大学',
  '开放大学'
]

const BasicForm = Form.create()(
  class extends Component {
    componentWillMount() {
      actions.openConfig.getListByConfig('EDUCATION_LEVEL')
      actions.schoolBasic.getByCollegeId()
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
      const { getFieldDecorator } = this.props.form
      return (
        <Page>
          <Form>
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
                  {COLLEGE_BELONGS.map((item, index) => {
                    return <Radio key={`college_belong_${index}`} value={item}>{item}</Radio>
                  })}
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem label="高校性质" {...formItemLayout}>
              {getFieldDecorator('college_nature')(
                <RadioGroup>
                  {COLLEGE_NATURES.map((item, index) => {
                    return <Radio key={`college_nature_${index}`} value={item}>{item}</Radio>
                  })}
                </RadioGroup>
              )
              }
            </FormItem>
            <FormItem label="办学层次(可多选)" {...formItemLayout}>
              {getFieldDecorator('education_level')(
                <RadioGroup>
                  {COLLEGE_NATURES.map((item, index) => {
                    return <Radio key={`education_level_${index}`} value={item}>{item}</Radio>
                  })}
                </RadioGroup>
              )
              }
            </FormItem>
          </Form>
        </Page>
      )
    }
  }
)
export default smart(state => {
  console.log('state: ', state)
  return {
    config: state.main.config
  }
})(BasicForm)
