import React, { Component } from 'react'
import { Table, Input, Button, Icon, message } from 'antd'
import { smart, actions } from 'cat-eye'
import UserForm from './userForm'
import EmailForm from './emailForm'
import CollegeForm from './collegeForm'
import md5 from 'md5'
import Page from 'components/common/page'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addCollege: false,
      modifyEmail: false,
      formData: {}
    }
  }
  componentWillMount() {
    actions.admin.getData()
  }

  getColumns = () => {
    return [
      {
        key: 'index',
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => {
          return <span>{`${index + 1}`}</span>
        }
      },
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
      },
      {
        key: 'email',
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          if (record.user_id === null || record.user_id === '') {
            return '';
          }
          return <div>
            <Button onClick={() => this.onModifyEmail(record)} style={{ marginRight: 15 }} ><Icon type="edit" />编辑用户邮箱</Button>
            <Button onClick={() => this.sendUserInfo(record.user_id)} ><Icon type="mail" />发送账户信息</Button>
          </div>
        }
      }
    ]
  }
  
  onModifyEmail = (record) => {
    this.modifyUserId=record.user_id
    this.setState({
      modifyEmail: true,
      formData: record
    })
  }
  
  sendUserInfo = (userId) => {
    message.loading('邮件发送中，请稍候...', 5)
    actions.admin.resetUserPassword(userId).then(res => {
          message.destroy()
          message.info('发送账户信息成功!')
        })
        .catch(e => {
          message.destroy()
          message.error('发送账户信息失败!')
        })
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
          user: item.user ? item.user.username : '',
          user_id: item.user ? item.user.id : '',
          email: item.user ? item.user.email : ''
        }
      })
      return list
    }
    return []
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      addCollege: false,
      modifyEmail: false
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
          email: values.email,
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
  
  handleModifyEmail = () => {
    const form = this.emailFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      actions.admin.modifyUserEmail({
        id: this.modifyUserId,
        email: values.email
      })
        .then(res => {
          message.info('操作成功!')
        })
        .catch(e => {
          message.error('操作失败!')
        })
      form.resetFields()
      this.setState({ modifyEmail: false })
    })
  }
  
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }
  
  modifyEmailFormRef = (formRef) => {
    this.emailFormRef = formRef
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
        <EmailForm
          wrappedComponentRef={this.modifyEmailFormRef}
          data={this.state.formData}
          visible={this.state.modifyEmail}
          onCancel={this.handleCancel}
          onCreate={this.handleModifyEmail}
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
