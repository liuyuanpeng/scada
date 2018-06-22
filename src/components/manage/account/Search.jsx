import React, { Component } from 'react'
import { smart, actions } from 'cat-eye'
import { Form, Input, Radio, Button } from 'antd'
import { ROLE } from 'config/constant'
import style from './style'

class Search extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      actions.account.getData(Object.assign(values, { offset: 0 }))
    })
  }
  render() {
    const { role, name } = this.props.params
    const { getFieldDecorator } = this.props.form
    return (
      <div className={style.right}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('role', {
              initialValue: role
            })(
              <Radio.Group>
                <Radio.Button value={0}>全部</Radio.Button>
                <Radio.Button value={ROLE.ADMIN}>管理员</Radio.Button>
                <Radio.Button value={ROLE.USER}>普通用户</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: name
            })(<Input placeholder="姓名搜索" />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default smart(state => {
  return {
    params: state.account.params
  }
})(Form.create()(Search))
