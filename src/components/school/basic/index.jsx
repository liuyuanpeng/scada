import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'components/common/page'

export default class extends Component {
    static propTypes = {

    }

    render() {
      return (
        <Page importUri={'/college/import'}>
          <div>basic</div>
        </Page>
      )
    }
}
