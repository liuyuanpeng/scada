import React from 'react'
import Search from './Search'
import List from './List'

export default props => {
  return (
    <div className="main">
      <div className="clearfix">
        <Search />
      </div>
      <div>
        <List />
      </div>
    </div>
  )
}
