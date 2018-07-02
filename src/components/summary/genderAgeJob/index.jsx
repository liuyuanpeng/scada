import React, { Component } from 'react'
import Page from 'components/common/page'
import { Table, Input, Icon, message } from 'antd'
import { smart, actions } from 'cat-eye'
import styles from './index.scss'
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value})
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ value })
  }

  check = () => {
    if (!parseInt(this.state.value)) {
      message.error('请输入合理的数字!')
      return
    }
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  edit = () => {
    this.setState({ editable: true })
  }

  render() {
    const { value, editable } = this.state
    return (
      <div className={styles['editable-cell']}>
        {
          editable ? (
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              suffix={(
                <Icon
                  type="check"
                  className={styles['editable-cell-icon-check']}
                  onClick={this.check}
                />
              )}
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value || ' '}
              <Icon
                type="edit"
                className={styles['editable-cell-icon']}
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    )
  }
}

class GenderAgeJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingKey: '',
      type: 'add'
    }
  }

  componentWillMount() {
    actions.openConfig.getListByConfig({code: 'STUDENT_ANALYSIS'})
    this.updateList(this.props.year, this.props.category)
  }

  updateList(year, category) {
    year && category && actions.summaryGenderAge.getStudentSexAgeJobList({
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
    if (this.props.gender && this.props.age && this.props.job) {
      return [
        {
          title: '一级类型',
          dataIndex: 'name',
          key: 'name',
          render: (text, record, index) => {
            const obj = {
              children: <span className={styles['header-style']}>{record.code_one.name}</span>,
              props: {}
            }
            if (index === 0) {
              obj.props.rowSpan = this.props.gender.length
            }
            if (index === this.props.gender.length) {
              obj.props.rowSpan = this.props.age.length
            }
            if (index === this.props.gender.length + this.props.age.length) {
              obj.props.rowSpan = this.props.job.length
            }
            if (index !== 0 && index !== this.props.gender.length && index !== this.props.age.length + this.props.gender.length) {
              obj.props.rowSpan = 0
            }
            return obj
          }
        },
        {
          title: '二级类型',
          dataIndex: 'code_two',
          key: 'code_two',
          render: (text, record) => {
            return <span className={styles['header-style']}>{record.code_two.name}</span>
          }
        }, {
          title: '值',
          dataIndex: 'value',
          key: 'value',
          width: '20%',
          render: (text, record) => {
            return <EditableCell
              value={record.student ? `${record.student.student_number}` : ''}
              onChange={value => { this.onCellChange(value, record) }}
            />
          }
        }
      ]
    }
    return []
  }

  getData = () => {
    let data = []
    if (this.props.gender && this.props.age && this.props.job && this.props.data) {
      this.props.gender.forEach((item, index) => {
        data.push({
          key: item.code,
          code_one: {code: 'STUDENT_ANALYSIS_SEX', name: '性别'},
          code_two: item,
          student: this.props.data[item.code]
        })
      })
      this.props.age.forEach((item, index) => {
        data.push({
          key: item.code,
          code_one: {code: 'STUDENT_ANALYSIS_AGE', name: '年龄'},
          code_two: item,
          student: this.props.data[item.code]
        })
      })
      this.props.job.forEach((item, index) => {
        data.push({
          key: item.code,
          code_one: {code: 'STUDENT_ANALYSIS_JOB', name: '职业'},
          code_two: item,
          student: this.props.data[item.code]
        })
      })
    }
    return data
  }

  onCellChange = (value, record) => {
    if (record.student) {
      actions.summaryGenderAge.save({...record.student, student_number: value})
    } else {
      actions.summaryGenderAge.save({
        config_code: 'STUDENT_ANALYSIS',
        config_enum_code: record.code_one.code,
        config_enum_value_code: record.code_two.code,
        current_year: this.props.year,
        maintain_id: localStorage.getItem('collegeId'),
        student_number: parseInt(value),
        study_mode: this.props.category
      })
    }
  }

  onUploadOK = () => {
    this.updateList(this.props.year, this.props.category)
  }

  render() {
    return (
      <Page importUri={'/student/import'} onSuccess={this.onUploadOK} showYear configType="STUDY_MODE" downloadUri='student' >
        <Table
          bordered
          showHeader={false}
          columns={this.columns()}
          dataSource={this.getData()}
          pagination={false}
        />
      </Page>
    )
  }
}

export default smart(state => {
  return {
    data: state.summaryGenderAge.data,
    year: state.page.year,
    category: state.page.type,
    gender: state.openConfig.STUDENT_ANALYSIS_SEX,
    age: state.openConfig.STUDENT_ANALYSIS_AGE,
    job: state.openConfig.STUDENT_ANALYSIS_JOB
  }
})(GenderAgeJob)
