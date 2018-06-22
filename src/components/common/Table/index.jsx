import React, { Component, PropTypes } from 'react'
import { Table } from 'antd'

export default class extends Component {
  static defaultProps = {
    rowKey: 'id',
    pagination: undefined,
    dataSource: undefined,
    loadData: undefined,
    size: 'large',
    loading: false
  }

  render() {
    const props = this.props
    let total = 0
    let limit = 10
    let offset = 0
    let current = 1
    const pager = props.pagination
    let pagination
    if (pager) {
      total = pager.rows_found
      limit = pager.limit
      offset = pager.offset
      current = Math.ceil(offset / limit)
      pagination = {
        total,
        current,
        pageSize: limit,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onChange: page => {
          let offset = (page - 1) * limit
          props.loadData({ offset, limit })
        }
      }
    } else {
      pagination = false
    }

    return <Table {...props} pagination={pagination} />
  }
}
