import React, { Component } from 'react'
import Table from 'components/common/table'
import { smart, actions } from 'cat-eye'
import style from './style'

class List extends Component {
  componentDidMount() {
    actions.account.getData()
  }
  render() {
    const props = this.props
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: 250
      },
      {
        title: '角色',
        dataIndex: 'role',
        render(role) {
          return [<span className={style.hot}>管理员</span>, '普通用户'][role - 1]
        }
      }
    ]
    return (
      <Table
        bordered
        columns={columns}
        dataSource={props.list.data}
        pagination={props.list.pagination}
        loading={props.list.loading}
        loadData={actions.account.getData}
      />
    )
  }
}

export default smart(state => {
  return {
    list: state.account
  }
})(List)
