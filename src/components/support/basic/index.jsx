import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import SupportBasicForm from './supportBasicForm'

class SupportBasic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }

  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'EVALUATE_STATUS'})
    actions.openConfig.getListByConfig({code: 'CENTER_NATURE'})
    this.updateList(this.props.year)
  }

  updateList(year) {
    year && actions.supportBasic.getList(year)
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
        title: '中心/站点名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '省厅审核备案',
        dataIndex: 'has_review',
        key: 'has_review',
        render: (text, record) => {
          return record.has_review ? '是' : '否'
        }
      }, {
        title: '当年省厅评估情况',
        dataIndex: 'evaluate_status',
        key: 'evaluate_status',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.evaluateStatus && modes.map(code => {
            const rt = this.props.evaluateStatus.find((item) => {
              return item.code === code
            })
            return rt && rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '性质',
        dataIndex: 'center_nature',
        key: 'center_nature',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.centerNature && modes.map(code => {
            const rt = this.props.centerNature.find((item) => {
              return item.code === code
            })
            return rt && rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '合作单位名称',
        dataIndex: 'cooperator_name',
        key: 'cooperator_name'
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
    actions.supportBasic.deleteById(record.id)
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

      actions.supportBasic.save({
        ...this.state.formData,
        ...values,
        has_review: values.has_review === 'yes'
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
      <Page importUri={'/non-public-study-center/import'} onSuccess={this.onUploadOK} showYear downloadUri='non-public-study-center' >
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <SupportBasicForm
          wrappedComponentRef={this.saveFormRef}
          evaluateStatus={this.props.evaluateStatus}
          centerNature={this.props.centerNature}
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
    data: state.supportBasic.data,
    year: state.page.year,
    years: state.page.years,
    evaluateStatus: state.openConfig.EVALUATE_STATUS,
    centerNature: state.openConfig.CENTER_NATURE
  }
})(SupportBasic)
