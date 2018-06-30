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
        key: 'study_mode'
      },
      {
        title: '培养层次',
        dataIndex: 'education_level',
        key: 'education_level'
      }, {
        title: '专业代码',
        dataIndex: 'make_time',
        key: 'make_time'
      }, {
        title: '专业名称',
        dataIndex: 'reference_number',
        key: 'reference_number'
      }, {
        title: '专业方向',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '招考方式',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '专业年度招生人数',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '在学人数',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '当年毕业生人数',
        dataIndex: 'draft_name',
        key: 'draft_name'
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return <div>
            <a
              href="javascript:;"
              onClick={() => this.modify(record)}
              style={{ marginRight: 8 }}
            >修改</a>
            <Popconfirm title="确定要删除?"
              onConfirm={() => { this.delete(record) }} >
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

  modify = (record) => {
    this.setState({
      type: 'edit',
      visible: true,
      formData: record
    })
  }

  delete = (record) => {
    actions.schoolRules.deleteByRegulationId(record.id)
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

      actions.schoolRules.saveRegulation({
        ...this.state.formData,
        ...values
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
    actions.schoolRules.getList()
  }

  render() {
    return null
    // return (
    //   <Page importUri={'/college-regulation/import'} onSuccess={this.onUploadOK} showYear configType="EDUCATION_CATEGORY">
    //     <Button type="primary" onClick={this.onAdd}>新增</Button>
    //     <Table
    //       columns={this.columns()}
    //       dataSource={this.data()}
    //       pagination={false}
    //     />
    //     <BasicForm
    //       wrappedComponentRef={this.saveFormRef}
    //       data={this.state.formData}
    //       type={this.state.type}
    //       onOK={this.onOK}
    //       onCancel={this.onCancel}
    //       visible={this.state.visible} />
    //   </Page>
    // )
  }
}

export default smart(state => {
  return {
    data: state.summaryBasic.data,
    year: state.page.year,
    category: state.page.type
  }
})(Rules)