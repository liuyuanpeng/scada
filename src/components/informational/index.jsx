import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import InformationalForm from './informationalForm'

class Informational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  
  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'APPLICATION_SOURCE'})
    this.updateList(this.props.year)
  }
  
  updateList(year) {
    year && actions.informational.getList(year)
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
      }, {
        title: '信息化建设应用名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '状态(有无)',
        dataIndex: 'has_application',
        key: 'has_application',
        render: (text, record) => {
          return record.has_application ? '有' : '无'
        }
      }, {
        title: '网址或服务名称(若该系统为非网络版本，在此栏填写“单机版”)',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '信息化建设项目来源',
        dataIndex: 'source',
        key: 'source',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.source && modes.map(code => {
            const rt = this.props.source.find((item) => {
              return item.code === code
            })
            return rt && rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
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
    actions.informational.deleteById(record.id)
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

      actions.informational.save({
        ...this.state.formData,
        ...values,
        has_application: values.has_application === 'yes'
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
      <Page importUri={'/information-application/import'} onSuccess={this.onUploadOK} showYear downloadUri='information-application' >
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <InformationalForm
          wrappedComponentRef={this.saveFormRef}
          source={this.props.source}
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
    data: state.informational.data,
    year: state.page.year,
    years: state.page.years,
    source: state.openConfig.APPLICATION_SOURCE
  }
})(Informational)