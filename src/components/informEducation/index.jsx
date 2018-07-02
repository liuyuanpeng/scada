import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import InformEducationForm from './informEducationForm'

class InformEducation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'ENROLL_STUDENT'})
    actions.openConfig.getListByConfig({code: 'EDUCATION_MODE'})
    this.updateList(this.props.year)
  }
  
  updateList(year) {
    year && actions.informEducation.getList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
  }

  columns = () => {
    return [
      {
        title: '非学历继续教育项目',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '招生方式',
        dataIndex: 'enroll_student',
        key: 'enroll_student',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.enrollStudent && modes.map(code => {
            const rt = this.props.enrollStudent.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '面向人群',
        dataIndex: 'toward_crowd',
        key: 'toward_crowd'
      }, {
        title: '教学模式',
        dataIndex: 'education_mode',
        key: 'education_mode',
        render: (text, record) => {
          const modes = text.split('|')
          const modeNames = this.props.educationMode && modes.map(code => {
            const rt = this.props.educationMode.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '年度总班次',
        dataIndex: 'total_class_number',
        key: 'total_class_number'
      }, {
        title: '年度总人数',
        dataIndex: 'total_student_number',
        key: 'total_student_number'
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
    actions.informEducation.deleteById(record.id)
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

      actions.informEducation.save({
        ...this.state.formData,
        ...values,
        enroll_student: values.enroll_student && values.enroll_student.join('|'),
        education_mode: values.education_mode && values.education_mode.join('|')
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
      <Page importUri={'/non-degree-continue-education-status/import'} onSuccess={this.onUploadOK} showYear downloadUri='non-degree-continue-education-status'>
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <InformEducationForm
          wrappedComponentRef={this.saveFormRef}
          years={this.props.years}
          data={this.state.formData}
          enrollStudent={this.props.enrollStudent}
          educationMode={this.props.educationMode}
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
    data: state.informEducation.data,
    year: state.page.year,
    years: state.page.years,
    enrollStudent: state.openConfig.ENROLL_STUDENT,
    educationMode: state.openConfig.EDUCATION_MODE
  }
})(InformEducation)
