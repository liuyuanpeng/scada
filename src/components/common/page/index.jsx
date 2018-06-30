import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from '../upload'
import { smart, actions } from 'cat-eye'
import { Select } from 'antd'

const Option = Select.Option

export default smart(state => {
  return {
    type: state.page.type,
    types: state.page.types,
    year: state.page.year,
    years: state.page.years
  }
})(class extends Component {
    static propTypes = {
      importUri: PropTypes.string, // 导入服务的api
      showYear: PropTypes.bool, // 显示年份选择
      configType: PropTypes.string // 类型组名
    }

    componentWillMount() {
      if (this.props.configType) {
        actions.page.getTypes(this.props.configType)
      }
    }

    onChange = value => {
      actions.page.setYear(value)
    }

    onTypeChange = value => {
      actions.page.setType(value)
    }

    render() {
      return (
        <div>
          {this.props.showYear && <Select style={{width: '200px', marginRight: '10px', marginBottom: '10px'}} value={this.props.year} onChange={this.onChange}>
            {
              this.props.years && this.props.years.map((item, index) => {
                return <Option key={`${index}`} value={item}>{`${item} 年`}</Option>
              })
            }
          </Select>}
          {
            this.props.configType && <Select style={{width: '200px', marginRight: '10px', marginBottom: '10px'}} value={this.props.type} onChange={this.onTypeChange}>
              {
                this.props.type && this.props.types[this.props.configType] && this.props.types[this.props.configType].map((item, index) => {
                  return <Option key={`${index}`} value={item.code}>{item.name}</Option>
                })
              }
            </Select>
          }
          {this.props.importUri &&
          <div style={{marginBottom: '24px', float: 'right'}}>
            <Upload
              action={this.props.importUri}
              onSuccess={this.props.onSuccess}
              onError={this.props.onError} />
          </div>}
          {this.props.children}
        </div>
      )
    }
})
