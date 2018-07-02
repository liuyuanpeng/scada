import React, { Component } from 'react'
import { Table, Input, Button } from 'antd'
import { smart, actions } from 'cat-eye'
import UserForm from './userForm'
import CollegeForm from './collegeForm'
import md5 from 'md5'
import Page from 'components/common/page'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addCollege: false
    }
  }
  componentWillMount() {
    actions.admin.getData()
  }

  getColumns = () => {
    return [
      {
        key: 'college_code',
        title: '学校代码',
        dataIndex: 'college_code'
      },
      {
        key: 'name',
        title: '学校名称',
        dataIndex: 'name'
      },
      {
        key: 'user',
        title: '管理员',
        dataIndex: 'user',
        render: (text, record) => text || (<Button type="primary" onClick={() => this.onAdd(record.id)} >新增</Button>)
      }
    ]
  }

  onAdd = (id) => {
    this.editId = id
    this.setState({
      visible: true
    })
  }

  getListData = () => {
    if (this.props.list) {
      const list = this.props.list.map((item, index) => {
        return {
          key: `${index}`,
          id: item.college.id,
          college_code: item.college.college_code,
          name: item.college.name,
          user: item.user ? item.user.username : ''
        }
      })
      return list
    }
    return []
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      addCollege: false
    })
  }

  handleOk = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      actions.admin.addUser({
        user: {
          maintain_id: this.editId,
          username: values.name,
          role: 'COLLEGE'
        },
        user_auth: {
          password: md5(values.password)
        }
      })
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  saveCollegeFormRef = (formRef) => {
    this.collegeFormRef = formRef
  }

  onAddCollege = () => {
    this.setState({
      addCollege: true
    })
  }

  handleAddCollege = () => {
    const form = this.collegeFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      actions.admin.addCollege(values)
      form.resetFields()
      this.setState({ addCollege: false })
    })
  }
  
  onUploadOK = () => {
    actions.admin.getData()
  }
  
  onSearchCollegeChange = value => {
    console.error(value.target.value)
  }

  render() {
    return (
      <Page importUri={'/college/import'} onSuccess={this.onUploadOK} downloadUri='college' >
        <Button type="primary" onClick={this.onAddCollege}>新增学校</Button>
        <h1 />
        <Table bordered columns={this.getColumns()} dataSource={this.getListData()} pagination={false} />
        <UserForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleOk}
        />
        <CollegeForm
          wrappedComponentRef={this.saveCollegeFormRef}
          visible={this.state.addCollege}
          onCancel={this.handleCancel}
          onCreate={this.handleAddCollege}
        />
      </Page>
    )
  }
}

export default smart(state => {
  return {
    list: state.admin.data
  }
})(Admin)
