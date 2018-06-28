import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table } from 'antd'
import { smart, actions } from 'cat-eye'
import OrgFrom from './orgForm'

class EducationOrg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentWillMount() {
    actions.openConfig.getListByConfig('STUDY_MODE')
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
          return text.replace(/\|/g, '、')
        }
      }, {
        title: '自学考试',
        dataIndex: 'has_self_study_exam',
        key: 'has_self_study_exam',
        render: (text, record) => {
          return record.has_self_study_exam ? '是' : '否'
        }
      }, {
        title: '非学历培训',
        dataIndex: 'has_non_degree_education',
        key: 'has_non_degree_education',
        render: (text, record) => {
          return record.has_non_degree_education ? '是' : '否'
        }
      }, {
        title: '操作',
        dataIndex: '',
        key: '',
        render: (text, record) => {
          return <div>
            <a
              href="javascript:;"
              onClick={() => this.modify(record)}
              style={{ marginRight: 8 }}
            >修改</a>
            <a
              href="javascript:;"
              onClick={() => this.delete(record)}
              style={{ marginRight: 8 }}
            >删除</a>
          </div>
        }
      }
    ]
  }

  data = () => {
    return this.props.data || []
  }

  onAdd = () => {
    this.setState({
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
      console.log(values)
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
      <Page importUri={'/organization/import'}>
        <Button type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <OrgFrom
          wrappedComponentRef={this.saveFormRef}
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
