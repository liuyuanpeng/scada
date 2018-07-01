import React, { Component } from 'react'
import Page from 'components/common/page'
import { Table, Input, InputNumber, Popconfirm, Form, Radio } from 'antd'
import { smart, actions } from 'cat-eye'
import styles from './index.scss'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'bool') {
      return <RadioGroup>
        <Radio value="yes">有</Radio>
        <Radio value="no">无</Radio>
      </RadioGroup>
    } else if (this.props.inputType === 'config') {
      return <RadioGroup>
        {
          this.props.configs && this.props.configs.map((item, index) => {
            return <Radio key={`${index}`} value={item.code}>{item.name}</Radio>
          })
        }
      </RadioGroup>
    } else if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `${title}!`
                    }],
                    initialValue: this.props.inputType === 'bool' ? (record[dataIndex] ? 'yes' : 'no') : record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

class GenderAgeJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingKey: ''
    }
  }

  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'APPLY_PERCENT'})
    actions.openConfig.getListByConfig({code: 'COURSEWARE_APPLY'})
    this.updateList(this.props.year)
  }

  updateList(year) {
    year && actions.teachCourseware.getDigitsList(year)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.year !== nextProps.year) {
      this.updateList(nextProps.year)
    }
  }

  columns = () => {
    if (this.props.coursewareMedia) {
      return [
        {
          title: '资源库类型',
          dataIndex: 'config_enum_value_code',
          key: 'config_enum_value_code',
          render: (text, record) => {
            let config = ''
            !config && (config = this.props.coursewareMedia.find(item => item.code === text))
            return <span className={styles['header-style']}>
              {(!config || config.code === 'COURSEWARE_APPLY_COURSEWARE_OTHER') ? record.other_apply_name : config.name}
            </span>
          }
        }, {
          title: '应用情况',
          dataIndex: 'has_apply',
          key: 'has_apply',
          editable: true,
          render: (text, record) => {
            return record.has_apply === undefined ? '' : (record.has_apply ? '有' : '无')
          }
        }, {
          title: '请估算使用该形式的课程占总课程的比例',
          dataIndex: 'apply_percent',
          key: 'apply_percent',
          editable: true,
          render: text => {
            const config = this.props.applyPercent ? this.props.applyPercent.find(item => item.code === text) : null
            return config ? config.name : ''
          }
        }, {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.isEditing(record)
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record)}
                          style={{ marginRight: 8 }}
                        >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="确定取消?"
                      onConfirm={() => this.cancel(record.key)}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a onClick={() => this.edit(record.key)}>编辑</a>
                )}
              </div>
            )
          }
        }
      ]
    }
    return []
  }

  getData = () => {
    let data = []
    if (this.props.coursewareMedia) {
      this.props.coursewareMedia.forEach(item => {
        let itemData = this.props.data && this.props.data.find(tData => tData.config_enum_value_code === item.code)
        itemData = itemData || []
        data.push({
          ...itemData,
          config_enum_code: 'COURSEWARE_APPLY',
          config_enum_value_code: item.code,
          key: `${item.code}`})
      })
    }
    return data
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey
  }

  edit = key => {
    this.setState({ editingKey: key })
  }

  save = (form, record) => {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      actions.teachCourseware.save({
        ...record,
        ...row,
        has_apply: row.has_apply === 'yes',
        current_year: this.props.year,
        config_code: 'COURSEWARE_APPLY',
        config_enum_code: 'COURSEWARE_APPLY_COURSEWARE',
        maintain_id: localStorage.getItem('collegeId')
      })
      this.setState({ editingKey: '' })
    })
  }

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  onUploadOK = () => {
    this.updateList(this.props.year)
  }

  constructColumns = (columns) => {
    return columns.map(col => {
      if (!col.editable) {
        if (col.children) {
          col.children = this.constructColumns(col.children)
        }
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          configs: this.props.applyPercent,
          inputType: col.dataIndex === 'has_apply' ? 'bool' : 'config',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }

    const columns = this.constructColumns(this.columns())
    return (
      <Page importUri={'/courseware-apply/import'} onSuccess={this.onUploadOK} showYear>
        <Table
          bordered
          rowClassName={styles['editable-row']}
          components={components}
          columns={columns}
          dataSource={this.getData()}
          pagination={false}
        />
      </Page>
    )
  }
}

export default smart(state => {
  return {
    data: state.teachCourseware.data,
    year: state.page.year,
    coursewareMedia: state.openConfig.COURSEWARE_APPLY_COURSEWARE,
    applyPercent: state.openConfig.APPLY_PERCENT
  }
})(GenderAgeJob)
