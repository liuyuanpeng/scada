import React, { Component } from 'react'
import Page from 'components/common/page'
import { Button, Table, Popconfirm, message } from 'antd'
import { smart, actions } from 'cat-eye'
import SupportCorpForm from './supportCorpForm'

class SupportCorp extends Component {
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
    actions.openConfig.getListByConfig({code: 'COOPERATOR_NATURE'})
    this.updateList(this.props.year)
  }

  updateList(year) {
    year && actions.supportCrop.getList(year)
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
      }, {
        title: '合作单位名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '合作单位性质',
        dataIndex: 'center_cooperator_nature',
        key: 'center_cooperator_nature',
        render: (text, record) => {
          if (!text) {
            return ''
          }
          const modes = text.split('|')
          const modeNames = this.props.cooperatorNature && modes.map(code => {
            const rt = this.props.cooperatorNature.find((item) => {
              return item.code === code
            })
            return rt.name
          })
          return modeNames ? modeNames.join('、') : ''
        }
      }, {
        title: '是否具有办学资格',
        dataIndex: 'has_qualify',
        key: 'has_qualify',
        render: (text, record) => {
          return record.has_qualify ? '是' : '否'
        }
      }, {
        title: '合作单位办学层次',
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
        title: '其他办学层次',
        dataIndex: 'other_education_level',
        key: 'other_education_level'
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
    actions.supportCrop.deleteById(record.id)
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

      actions.supportCrop.save({
        ...this.state.formData,
        ...values,
        has_qualify: values.has_qualify === 'yes',
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
    this.updateList(this.props.year)
  }

  render() {
    return (
      <Page importUri={'/non-public-study-center-cooperator/import'} onSuccess={this.onUploadOK} showYear >
        <Button style={{marginBottom: '24px'}} type="primary" onClick={this.onAdd}>新增</Button>
        <Table
          bordered
          columns={this.columns()}
          dataSource={this.data()}
          pagination={false}
        />
        <SupportCorpForm
          wrappedComponentRef={this.saveFormRef}
          educationLevel={this.props.educationLevel}
          cooperatorNature={this.props.cooperatorNature}
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
    data: state.supportCrop.data,
    year: state.page.year,
    years: state.page.years,
    educationLevel: state.openConfig.EDUCATION_LEVEL,
    cooperatorNature: state.openConfig.COOPERATOR_NATURE
  }
})(SupportCorp)
