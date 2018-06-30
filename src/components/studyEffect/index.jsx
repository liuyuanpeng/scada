import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import StudyEffectForm from './studyEffectForm'

class StudyEffect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  componentWillMount() {
    actions.studyEffect.getList('2017')
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
        title: '是否开展学生满意度调查',
        dataIndex: 'has_student_satisfaction_survey',
        key: 'has_student_satisfaction_survey',
        render: (text, record) => {
          return record.has_student_satisfaction_survey ? '是' : '否'
        }
      }, {
        title: '学生满意度调查周期',
        dataIndex: 'is_student_survey_period_fix',
        key: 'is_student_survey_period_fix',
        render: (text, record) => {
          return record.is_student_survey_period_fix ? '定期' : '不定期'
        }
      }, {
        title: '是否开展社会用人单位对毕业生的反馈评价调查',
        dataIndex: 'has_company_satisfaction_survey',
        key: 'has_company_satisfaction_survey',
        render: (text, record) => {
          return record.has_company_satisfaction_survey ? '是' : '否'
        }
      }, {
        title: '社会用人单位对毕业生的反馈评价周期',
        dataIndex: 'is_company_survey_period_fix',
        key: 'has_guarantee_regulation',
        render: (text, record) => {
          return record.is_company_survey_period_fix ? '定期' : '不定期'
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
              onConfirm={() => { this.onDelte(record) }} >
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

  onDelte = (record) => {
    actions.studyEffect.deleteById(record.id)
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

      actions.studyEffect.save({
        ...this.state.formData,
        ...values,
        has_student_satisfaction_survey: values.has_student_satisfaction_survey === 'yes',
        is_student_survey_period_fix: values.is_student_survey_period_fix === 'yes',
        has_company_satisfaction_survey: values.has_company_satisfaction_survey === 'yes',
        is_company_survey_period_fix: values.is_company_survey_period_fix === 'yes'
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

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <StudyEffectForm
          wrappedComponentRef={this.saveFormRef}
          data={this.state.formData}
          type={this.state.type}
          onOK={this.onOK}
          onCancel={this.onCancel}
          visible={this.state.visible} />
      </div>
    )
  }
}

export default smart(state => {
  return {
    data: state.studyEffect.data
  }
})(StudyEffect)
