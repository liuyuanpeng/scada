import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import BasicForm from './basicForm'

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
    actions.openConfig.getListByConfig({code: 'EXAM_ENTRANCE'})
    actions.openConfig.getListByConfig({code: 'EDUCATION_CATEGORY'})
    actions.openConfig.getListByConfig({code: 'EDUCATION_LEVEL'})
    actions.openConfig.getListByConfig({code: 'STUDY_MODE'})
    this.updateList(this.props.year, this.props.category)
  }

  updateList(year, category) {
    year && category && actions.summaryBasic.getList({
      currentYear: year,
      educationCategory: category
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year || this.props.category !== nextProps.category) {
      this.updateList(nextProps.year, nextProps.category)
    }
  }

  columns = () => {
    return [
      {
        title: '类型',
        dataIndex: 'study_mode',
        key: 'study_mode',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.studyMode && modes.map(code => {
            const rt = this.props.studyMode.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      },
      {
        title: '培养层次',
        dataIndex: 'education_level',
        key: 'education_level',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.educationLevel && modes.map(code => {
            const rt = this.props.educationLevel.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '专业代码',
        dataIndex: 'subject_code',
        key: 'subject_code'
      }, {
        title: '专业名称',
        dataIndex: 'subject_name',
        key: 'subject_name'
      }, {
        title: '专业方向',
        dataIndex: 'subject_direction',
        key: 'subject_direction'
      }, {
        title: '招考方式',
        dataIndex: 'exam_entrance',
        key: 'exam_entrance',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.examEntrance && modes.map(code => {
            const rt = this.props.examEntrance.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '专业年度招生人数',
        dataIndex: 'enroll_number',
        key: 'enroll_number'
      }, {
        title: '在学人数',
        dataIndex: 'study_number',
        key: 'study_number'
      }, {
        title: '当年毕业生人数',
        dataIndex: 'graduate_number',
        key: 'graduate_number'
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
    actions.summaryBasic.deleteById(record.id)
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

      actions.summaryBasic.save({
        ...this.state.formData,
        ...values,
        study_mode: values.study_mode && values.study_mode.join('|'),
        education_level: values.education_level && values.education_level.join('|'),
        exam_entrance: values.exam_entrance && values.exam_entrance.join('|')
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
    this.updateList(this.props.year, this.props.category)
  }

  render() {
    return (
      <Page importUri={'/organization-scale/import'} onSuccess={this.onUploadOK} showYear configType="EDUCATION_CATEGORY">
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <BasicForm
          wrappedComponentRef={this.saveFormRef}
          educationCategory={this.props.educationCategory}
          educationLevel={this.props.educationLevel}
          studyMode={this.props.studyMode}
          examEntrance={this.props.examEntrance}
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
    data: state.summaryBasic.data,
    year: state.page.year,
    years: state.page.years,
    category: state.page.type,
    educationLevel: state.openConfig.EDUCATION_LEVEL,
    studyMode: state.openConfig.STUDY_MODE,
    examEntrance: state.openConfig.EXAM_ENTRANCE,
    educationCategory: state.openConfig.EDUCATION_CATEGORY
  }
})(Rules)
