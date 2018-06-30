import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import InsideQualityForm from './insideQualityForm'

class InsideQuality extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'add',
      formData: {}
    }
  }
  componentWillMount() {
    this.updateList(this.props.year)
  }
  
  updateList(year) {
    year && actions.insideQuality.getList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
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
        title: '是否建立内部质量保证部门',
        dataIndex: 'has_guarantee_dept',
        key: 'has_guarantee_dept',
        render: (text, record) => {
          return record.has_guarantee_dept ? '是' : '否'
        }
      }, {
        title: '部门名称',
        dataIndex: 'dept_name',
        key: 'dept_name'
      }, {
        title: '是否建立内部质量管理制度',
        dataIndex: 'has_guarantee_regulation',
        key: 'has_guarantee_regulation',
        render: (text, record) => {
          return record.has_guarantee_regulation ? '是' : '否'
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
    actions.insideQuality.deleteById(record.id)
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

      actions.insideQuality.save({
        ...this.state.formData,
        ...values,
        has_guarantee_dept: values.has_guarantee_dept === 'yes',
        dept_name: values.has_guarantee_dept == 'yes' ? values.dept_name : '',
        has_guarantee_regulation: values.has_guarantee_regulation === 'yes'
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
      <Page showYear>
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <InsideQualityForm
          wrappedComponentRef={this.saveFormRef}
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
    data: state.insideQuality.data,
    year: state.page.year,
    years: state.page.years
  }
})(InsideQuality)
