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
    actions.openConfig.getListByConfig({code: 'EDUCATION_LEVEL'})
    actions.openConfig.getListByConfig({code: 'STUDY_MODE'})
    this.updateList(this.props.year, this.props.category)
  }

  updateList(year, category) {
    year && category && actions.professionScore.getList({
      currentYear: year,
      studyMode: category
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
            return (!rt || rt.code === 'EDUCATION_LEVEL_OTHER') ? record.other_education_level : rt.name
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
        title: '最短修业年限',
        dataIndex: 'shortest_study_time',
        key: 'shortest_study_time'
      }, {
        title: '最长修业年限',
        dataIndex: 'longest_study_time',
        key: 'longest_study_time'
      }, {
        title: '总学分',
        dataIndex: 'total_study_point',
        key: 'total_study_point'
      }, {
        title: '选修课学分要求',
        dataIndex: 'selective_study_point',
        key: 'selective_study_point'
      }, {
        title: '实践教学学分要求',
        dataIndex: 'practice_study_point',
        key: 'practice_study_point'
      }, {
        title: '毕业实践学分要求',
        dataIndex: 'graduate_practice_study_point',
        key: 'graduate_practice_study_point'
      }, {
        title: '是否为特色专业',
        dataIndex: 'is_college_special',
        key: 'is_college_special',
        render: (text, record) => {
          return text ? '是' : '否'
        }
      }, {
        title: '是否为省级特色专业',
        dataIndex: 'is_province_special',
        key: 'is_province_special',
        render: (text, record) => {
          return text ? '是' : '否'
        }
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
    actions.professionScore.deleteById(record.id)
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

      actions.professionScore.save({
        ...this.state.formData,
        ...values,
        education_level: values.education_level && values.education_level.join('|'),
        is_college_special: values.is_college_special === 'yes',
        is_province_special: values.is_college_special === 'yes'
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
      <Page importUri={'/major-setup-point-system/import'} onSuccess={this.onUploadOK} showYear configType="STUDY_MODE" downloadUri='major-setup-point-system' >
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
    data: state.professionScore.data,
    year: state.page.year,
    years: state.page.years,
    category: state.page.type,
    educationLevel: state.openConfig.EDUCATION_LEVEL,
    studyMode: state.openConfig.STUDY_MODE
  }
})(Rules)
