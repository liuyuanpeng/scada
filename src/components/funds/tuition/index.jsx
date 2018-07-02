import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import TuitionForm from './tuitionForm'

class FundsTuition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  
  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'STUDY_MODE'})
    actions.openConfig.getListByConfig({code: 'EDUCATION_LEVEL'})
    this.updateList(this.props.year, this.props.category)
  }
  
  updateList(year, mode) {
    year && mode && actions.fundsTuition.getList({
      currentYear: year,
      studyMode: mode
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
      }, {
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
        title: '其他培养层次',
        dataIndex: 'other_education_level',
        key: 'other_education_level'
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
        title: '学费标准最低 (元/学年)',
        dataIndex: 'min_per_year',
        key: 'min_per_year'
      }, {
        title: '学费标准最高 (元/学年)',
        dataIndex: 'max_per_year',
        key: 'max_per_year'
      }, {
        title: '学费标准最低 (元/学分)',
        dataIndex: 'min_per_score',
        key: 'min_per_score'
      }, {
        title: '学费标准最高 (元/学分)',
        dataIndex: 'max_per_score',
        key: 'max_per_score'
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
    actions.fundsTuition.deleteById(record.id)
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

      actions.fundsTuition.save({
        ...this.state.formData,
        ...values,
        education_level: values.education_level && values.education_level.join('|'),
        other_education_level: values.education_level && (values.education_level.findIndex(item => item === 'EDUCATION_LEVEL_OTHER') === -1 ? '' : values.other_education_level)
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
      <Page importUri={'/tuition/import'} onSuccess={this.onUploadOK} showYear configType="STUDY_MODE" downloadUri='tuition' >
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <TuitionForm
          wrappedComponentRef={this.saveFormRef}
          educationLevel={this.props.educationLevel}
          studyMode={this.props.studyMode}
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
    data: state.fundsTuition.data,
    year: state.page.year,
    years: state.page.years,
    category: state.page.type,
    educationLevel: state.openConfig.EDUCATION_LEVEL,
    studyMode: state.openConfig.STUDY_MODE
  }
})(FundsTuition)