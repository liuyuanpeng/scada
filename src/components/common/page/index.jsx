import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from '../upload'

export default class extends Component {
    static propTypes = {
      importUri: PropTypes.string,
      uploadSuccess: PropTypes.func,
      uploadError: PropTypes.func
    }

    render() {
      return (
        <div>
          {this.props.importUri &&
          <div style={{marginBottom: '24px', float: 'right'}}>
            <Upload
              action={this.props.importUri}
              onSuccess={this.props.uploadSuccess}
              onError={this.props.uploadError} />
          </div>}
          {this.props.children}
        </div>
      )
    }
}
