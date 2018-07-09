import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import RequiresForm from './requiresForm'

class SupportRequires extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }

  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'ANSWER_TIME'})
    this.updateList(this.props.year)
  }

  updateList(year) {
    year && actions.supportRequires.getList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
  }

  columns = () => {
    return [
      {
        title: '对学生咨询做出回应的时间规定(有无)',
        dataIndex: 'has_reference',
        key: 'has_reference',
        render: (text, record) => {
          return record.has_reference ? '有' : '无'
        }
      },
      {
        title: '咨询规定的回应时间',
        dataIndex: 'reference_answer_time',
        key: 'reference_answer_time',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          if (text === 'ANSWER_TIME_OTHER') {
            return record.other_reference_answer_time
          }
          const modes = text.split('|')
          const modeNames = this.props.referenceAnswerTime && modes.map(code => {
            const rt = this.props.referenceAnswerTime.find((item) => {
              return item.code === code
            })
            return rt && rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '对学生投诉做出回应的时间规定(有无)',
        dataIndex: 'has_complaint',
        key: 'has_complaint',
        render: (text, record) => {
          return record.has_complaint ? '有' : '无'
        }
      }, {
        title: '投诉规定的回应时间',
        dataIndex: 'complaint_answer_time',
        key: 'complaint_answer_time',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          if (text === 'ANSWER_TIME_OTHER') {
            return record.other_complaint_answer_time
          }
          const modes = text.split('|')
          const modeNames = this.props.complaintAnswerTime && modes.map(code => {
            const rt = this.props.complaintAnswerTime.find((item) => {
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
    actions.supportRequires.deleteById(record.id)
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

      actions.supportRequires.save({
        ...this.state.formData,
        ...values,
        has_reference: values.has_reference === 'yes',
        other_reference_answer_time: values.reference_answer_time == 'ANSWER_TIME_OTHER' ? values.other_reference_answer_time : '',
        has_complaint: values.has_complaint === 'yes',
        other_complaint_answer_time: values.complaint_answer_time == 'ANSWER_TIME_OTHER' ? values.other_complaint_answer_time : ''
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
        <RequiresForm
          wrappedComponentRef={this.saveFormRef}
          referenceAnswerTime={this.props.referenceAnswerTime}
          complaintAnswerTime={this.props.complaintAnswerTime}
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
    data: state.supportRequires.data,
    year: state.page.year,
    years: state.page.years,
    referenceAnswerTime: state.openConfig.ANSWER_TIME,
    complaintAnswerTime: state.openConfig.ANSWER_TIME
  }
})(SupportRequires)
