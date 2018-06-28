import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import RuleForm from './ruleForm'

class Rules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  componentWillMount() {
    actions.schoolRules.getList()
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
        title: '制度名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '编制时间',
        dataIndex: 'make_time',
        key: 'make_time'
      }, {
        title: '发文文号',
        dataIndex: 'reference_number',
        key: 'reference_number'
      }, {
        title: '拟新建管理制度名称',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return <div>
            <a
              href="javascript:;"
              onClick={() => this.modify(record)}
              style={{ marginRight: 8 }}
            >修改</a>
            <Popconfirm title="确定要删除?"
              onConfirm={() => { this.delete(record) }} >
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

  modify = (record) => {
    this.setState({
      type: 'edit',
      visible: true,
      formData: record
    })
  }

  delete = (record) => {
    actions.schoolRules.deleteByRegulationId(record.id)
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

      actions.schoolRules.saveRegulation({
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
    actions.schoolRules.getList()
  }

  render() {
    return (
      <Page importUri={'/college-regulation/import'} onSuccess={this.onUploadOK}>
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <RuleForm
          wrappedComponentRef={this.saveFormRef}
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
    data: state.schoolRules.data
  }
})(Rules)
