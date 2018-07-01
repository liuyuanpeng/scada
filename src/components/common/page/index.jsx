import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from '../upload'
import { smart, actions } from 'cat-eye'
import { Select, Button, Icon } from 'antd'
import styles from './style'

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
      downloadUri: PropTypes.string, // 下载uri
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

    getExport = () => {
      window.open(`http://119.23.9.49/v0.1/ceqas/${this.props.downloadUri}/export?is-template=false&token=${localStorage.getItem('accessToken')}`)
    }

    render() {
      return (
        <div>
          {this.props.showYear && <Select style={{width: '200px', marginRight: '10px', marginBottom: '10px'}} value={`${this.props.year}`} onChange={this.onChange}>
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
          {this.props.downloadUri &&
          <div className={styles.float_btn}>
            <a href={`http://119.23.9.49/v0.1/ceqas/${this.props.downloadUri}/export?is-template=true&token=${localStorage.getItem('accessToken')}`} target="_blank">
                下载Excel模板
            </a>
          </div>}
          {this.props.downloadUri &&
          <div className={styles.float_btn}>
            <Button onClick={this.getExport}>
              <Icon type="download" />导出
            </Button>
          </div>}
          {this.props.importUri &&
          <div className={styles.float_btn}>
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
