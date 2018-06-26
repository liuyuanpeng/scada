import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon, message } from 'antd'
import {SERVER} from 'config/constant'

export default class extends Component {
    static propTypes = {
      action: PropTypes.string.isRequired,
      onSuccess: PropTypes.func,
      onError: PropTypes.func
    }

    onChange = info => {
      if (info.file.status !== 'uploading') {
        this.hideTip = message.loading('导入中，请稍后...')
      }
      if (info.file.status === 'done') {
        if (info.file.response.code !== 'SUCCESS') {
          message.error(info.file.response.message, 3)
          console.log('导入失败')
          this.props.onError && this.props.onError(info)
          if (this.hideTip) {
            this.hideTip()
          }
          return
        }
        console.log('导入成功')
        this.props.onSuccess && this.props.onSuccess(info)
        if (this.hideTip) {
          this.hideTip()
        }
      } else if (info.file.status === 'error') {
        console.log('导入失败')
        this.props.onError && this.props.onError(info)
        if (this.hideTip) {
          this.hideTip()
        }
      }
      console.log(info)
    }

    render() {
      return (
        <Upload
          multiple={false}
          headers={
            {token: localStorage.getItem('accessToken')}
          }
          action={`${SERVER.protocol}://${SERVER.host}${SERVER.prefix}${this.props.action}`}
          onChange={this.onChange}>
          <Button>
            <Icon type="upload" />导入
          </Button>
        </Upload>
      )
    }
}
