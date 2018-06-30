import React, { Component } from 'react'
import Page from 'components/common/page'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd'
import { smart, actions } from 'cat-eye'
import styles from './index.scss'

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  };

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
                      message: `请输入${title}人数!`
                    }],
                    initialValue: record[dataIndex]
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
    actions.openConfig.getListByConfig({code: 'TEACHER_ANALYSIS'})
    this.updateList(this.props.year, this.props.category)
  }

  updateList(year, category) {
    year && category && actions.structure.getTeacherList({
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
    if (this.props.major && this.props.education && this.props.age) {
      return [
        {
          title: '类型',
          colSpan: 2,
          dataIndex: 'config_enum_code',
          key: 'config_enum_code',
          render: (text, record, index) => {
            const obj = {
              children: <span className={styles['header-style']}>
                {this.props.teacherAnalysis ? this.props.teacherAnalysis.find(item => item.code === text).name : ''}
              </span>,
              props: {}
            }
            if (index === 0) {
              obj.props.rowSpan = this.props.major.length
            }
            if (index === this.props.major.length) {
              obj.props.rowSpan = this.props.education.length
            }
            if (index === this.props.major.length + this.props.education.length) {
              obj.props.rowSpan = this.props.age.length
            }
            if (index !== 0 && index !== this.props.major.length && index !== this.props.education.length + this.props.major.length) {
              obj.props.rowSpan = 0
            }
            return obj
          }
        },
        {
          title: '子类型',
          colSpan: 0,
          dataIndex: 'config_enum_value_code',
          key: 'config_enum_value_code',
          render: text => {
            let config = ''
            !config && (config = this.props.major.find(item => item.code === text))
            !config && (config = this.props.education.find(item => item.code === text))
            !config && (config = this.props.age.find(item => item.code === text))
            return <span className={styles['header-style']}>
              {config.name}
            </span>
          }
        },
        {
          title: '授课老师',
          children: [
            {
              title: '专职',
              dataIndex: 'full_time_number',
              key: 'full_time_number',
              editable: true
            }, {
              title: '兼职',
              dataIndex: 'part_time_number',
              key: 'part_time_number',
              editable: true
            }
          ]
        }, {
          title: '辅导老师',
          dataIndex: 'tutor_number',
          key: 'tutor_number',
          editable: true
        }, {
          title: '管理人员',
          dataIndex: 'manager_number',
          key: 'manager_number',
          editable: true
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
    if (this.props.major && this.props.education && this.props.age) {
      let tableData = this.props.data ? this.props.data : {}
      this.props.major.forEach(item => {
        data.push({
          ...tableData[item.code],
          config_enum_code: 'TEACHER_ANALYSIS_MAJOR',
          config_enum_value_code: item.code,
          key: `${item.code}`})
      })
      this.props.education.forEach(item => {
        data.push({
          ...tableData[item.code],
          config_enum_code: 'TEACHER_ANALYSIS_EDUCATION',
          config_enum_value_code: item.code,
          key: `${item.code}`})
      })
      this.props.age.forEach(item => {
        data.push({
          ...tableData[item.code],
          config_enum_code: 'TEACHER_ANALYSIS_AGE',
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
      actions.structure.save({
        ...record,
        ...row,
        current_year: this.props.year,
        study_mode: this.props.category,
        config_code: 'TEACHER_ANALYSIS',
        maintain_id: localStorage.getItem('collegeId')
      })
      this.setState({ editingKey: '' })
    })
  }

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  onUploadOK = () => {
    this.updateList(this.props.year, this.props.category)
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
          inputType: 'number',
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
      <Page importUri={'/teacher/import'} onSuccess={this.onUploadOK} showYear configType="STUDY_MODE">
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
    data: state.structure.data,
    year: state.page.year,
    category: state.page.type,
    major: state.openConfig.TEACHER_ANALYSIS_MAJOR,
    age: state.openConfig.TEACHER_ANALYSIS_AGE,
    education: state.openConfig.TEACHER_ANALYSIS_EDUCATION,
    teacherAnalysis: state.openConfig.TEACHER_ANALYSIS
  }
})(GenderAgeJob)
