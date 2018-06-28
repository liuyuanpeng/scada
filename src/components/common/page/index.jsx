import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from '../upload'

export default class extends Component {
    static propTypes = {
      importUri: PropTypes.string,
      onSuccess: PropTypes.func,
      onError: PropTypes.func
    }

    render() {
      return (
        <div>
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
}
