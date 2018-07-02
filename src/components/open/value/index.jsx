import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import ConfigEnumValueForm from './valueForm'

class ConfigEnumValue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  
  componentWillMount() {
    actions.configEnumValue.getList()
  }

  columns = () => {
    return [
      {
        title: '一级代码',
        dataIndex: 'config_code',
        key: 'config_code'
      }, {
        title: '二级代码',
        dataIndex: 'config_enum_code',
        key: 'config_enum_code'
      }, {
        title: '三级代码',
        dataIndex: 'code',
        key: 'code'
      }, {
        title: '三级代码名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '三级代码说明',
        dataIndex: 'description',
        key: 'description'
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

      actions.configEnumValue.save({
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
    actions.configEnumValue.getList()
  }

  render() {
    return (
      <Page importUri={'/open-config/import-config-enum-value'} onSuccess={this.onUploadOK} >
        <Button type="primary" onClick={this.onUploadOK}>刷新</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <ConfigEnumValueForm
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
    data: state.configEnumValue.data
  }
})(ConfigEnumValue)
