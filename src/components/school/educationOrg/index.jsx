import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import OrgFrom from './orgForm'

class EducationOrg extends Component {
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
    actions.schoolEducationOrg.getList()
  }

  columns = () => {
    return [
      {
        title: '办学机构名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '负责人姓名',
        dataIndex: 'master',
        key: 'master'
      }, {
        title: '联系电话',
        dataIndex: 'telephone',
        key: 'telephone'
      }, {
        title: '主要业务类型',
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
        title: '自学考试',
        dataIndex: 'has_self_study_exam',
        key: 'has_self_study_exam',
        render: (text, record) => {
          return record.has_self_study_exam ? '有' : '无'
        }
      }, {
        title: '非学历培训',
        dataIndex: 'has_non_degree_education',
        key: 'has_non_degree_education',
        render: (text, record) => {
          return record.has_non_degree_education ? '有' : '无'
        }
      }, {
        title: '归口管理部门',
        dataIndex: 'manage_department_name',
        key: 'manage_department_name',
        render: (text, record) => {
          return record.manage_department_name || '无'
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
    actions.schoolEducationOrg.deleteByOrganizationId(record.id)
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

      actions.schoolEducationOrg.saveOrganization({
        ...this.state.formData,
        ...values,
        has_manage_department: values.has_manage_department === 'yes',
        has_non_degree_education: values.has_non_degree_education === 'yes',
        has_self_study_exam: values.has_self_study_exam === 'yes',
        study_mode: values.study_mode && values.study_mode.join('|')
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
    actions.schoolEducationOrg.getList()
  }

  render() {
    return (
      <Page importUri={'/organization/import'} onSuccess={this.onUploadOK}>
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <OrgFrom
          wrappedComponentRef={this.saveFormRef}
          data={this.state.formData}
          studyMode={this.props.studyMode}
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
    data: state.schoolEducationOrg.data,
    studyMode: state.openConfig.STUDY_MODE
  }
})(EducationOrg)
