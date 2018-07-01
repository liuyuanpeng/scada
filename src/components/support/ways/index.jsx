import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import WaysForm from './waysForm'

class SupportWays extends Component {
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
    year && actions.supportWays.getList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
  }

  columns = () => {
    return [
      {
        title: '热线电话',
        dataIndex: 'has_telephone',
        key: 'has_telephone',
        render: (text, record) => {
          return record.has_telephone ? '有' : '无'
        }
      }, {
        title: 'QQ群',
        dataIndex: 'has_QQ',
        key: 'has_QQ',
        render: (text, record) => {
          return record.has_QQ ? '有' : '无'
        }
      }, {
        title: '论坛',
        dataIndex: 'has_Discuss',
        key: 'has_Discuss',
        render: (text, record) => {
          return record.has_Discuss ? '有' : '无'
        }
      }, {
        title: '电子邮箱',
        dataIndex: 'has_email',
        key: 'has_email',
        render: (text, record) => {
          return record.has_email ? '有' : '无'
        }
      }, {
        title: '面授辅导',
        dataIndex: 'has_face_to_face_teach',
        key: 'has_face_to_face_teach',
        render: (text, record) => {
          return record.has_face_to_face_teach ? '有' : '无'
        }
      }, {
        title: '在线实时辅导',
        dataIndex: 'has_online_teach',
        key: 'has_online_teach',
        render: (text, record) => {
          return record.has_online_teach ? '有' : '无'
        }
      }, {
        title: '微信群',
        dataIndex: 'has_wechat',
        key: 'has_wechat',
        render: (text, record) => {
          return record.has_wechat ? '有' : '无'
        }
      }, {
        title: '其他',
        dataIndex: 'has_other',
        key: 'has_other',
        render: (text, record) => {
          return record.has_other ? '有' : '无'
        }
      }, {
        title: '其他服务名称',
        dataIndex: 'other_service_name',
        key: 'other_service_name'
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
    actions.supportWays.deleteById(record.id)
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

      actions.supportWays.save({
        ...this.state.formData,
        ...values,
        has_telephone: values.has_telephone === 'yes',
        has_QQ: values.has_QQ === 'yes',
        has_Discuss: values.has_Discuss === 'yes',
        has_email: values.has_email === 'yes',
        has_face_to_face_teach: values.has_face_to_face_teach === 'yes',
        has_online_teach: values.has_online_teach === 'yes',
        has_wechat: values.has_wechat === 'yes',
        has_other: values.has_other === 'yes',
        other_service_name: values.has_other ? values.other_service_name : ''
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
      <Page showYear>
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <WaysForm
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
    data: state.supportWays.data,
    year: state.page.year,
    years: state.page.years
  }
})(SupportWays)
