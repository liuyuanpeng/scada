import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import FundsOutForm from './fundsOutForm'

class FundsOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  
  componentWillMount() {
    this.updateList(this.props.year)
  }
  
  updateList(year) {
    year && actions.fundsOut.getList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
  }

  columns = () => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => {
          return <span>{`${index + 1}`}</span>
        }
      },
      {
        title: '教学人员(万元)',
        dataIndex: 'teacher_salary',
        key: 'teacher_salary'
      }, {
        title: '管理人员(万元)',
        dataIndex: 'manager_salary',
        key: 'manager_salary'
      }, {
        title: '资源建设(万元)',
        dataIndex: 'resource_build_pay',
        key: 'resource_build_pay'
      }, {
        title: '平台系统(万元)',
        dataIndex: 'platform_build_pay',
        key: 'platform_build_pay'
      }, {
        title: '基础设施(万元)',
        dataIndex: 'base_build_pay',
        key: 'base_build_pay'
      }, {
        title: '年总支出(万元)',
        dataIndex: 'total_payout',
        key: 'total_payout'
      }, {
        title: '记录时间',
        dataIndex: 'current_year',
        key: 'current_year'
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return <div>
            <a
              href="javascript:;"
              onClick={() => this.onModify(record)}
              style={{ marginRight: 8 }}
            >修改</a>
            <Popconfirm title="确定要删除?"
              onConfirm={() => { this.onDelete(record) }} >
              <a href="#">删除</a>
            </Popconfirm>
          </div>
        }
      }
    ]
  }

  data = () => {
    if (this.props.data) {
      return this.props.data.map((item, index) => {
        return {...item, key: `${index}`}
      })
    }
  }

  onModify = (record) => {
    this.setState({
      type: 'edit',
      visible: true,
      formData: record
    })
  }

  onDelete = (record) => {
    actions.fundsOut.deleteById(record.id)
      .then(res => {
        message.info('删除成功!')
      })
      .catch(e => {
        message.error('删除失败!')
      })
  }

  onAdd = () => {
    this.setState({
      type: 'add',
      formData: {},
      visible: true
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  onOK = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      actions.fundsOut.save({
        ...this.state.formData,
        ...values
      })
        .then(res => {
          message.info('操作成功!')
        })
        .catch(e => {
          message.error('操作失败!')
        })
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onUploadOK = () => {
    this.updateList(this.props.year)
  }

  render() {
    return (
      <Page showYear >
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <FundsOutForm
          wrappedComponentRef={this.saveFormRef}
          years={this.props.years}
          data={this.state.formData}
          type={this.state.type}
          onOK={this.onOK}
          onCancel={this.onCancel}
          visible={this.state.visible} />
      </Page>
    )
  }
}

export default smart(state => {
  return {
    data: state.fundsOut.data,
    year: state.page.year,
    years: state.page.years
  }
})(FundsOut)