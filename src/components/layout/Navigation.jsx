import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link, urlFor, smart } from 'cat-eye'
import style from './style'

function getUrl(item) {
  if (item.url) {
    return item.url
  }
  while (item.sub) {
    item = item.sub[0]
  }
  if (item && item.url) {
    return item.url
  }
}

const Wrapper = props => {
  console.log('navigator props:', props)
  if (props.menu && props.menu.length) {
    return (
      <div className={style.navigation}>
        <Breadcrumb>
          {props.menu.map(item => {
            const icon = item.icon ? <Icon type={item.icon} /> : undefined
            const url = getUrl(item)
            if (url) {
              return (
                <Breadcrumb.Item key={item.keyPath.join('-')}>
                  <Link to={urlFor(url)}>
                    {icon} {item.name}
                  </Link>
                </Breadcrumb.Item>
              )
            } else {
              return (
                <Breadcrumb.Item key={item.keyPath.join('-')}>
                  {icon} {item.name}
                </Breadcrumb.Item>
              )
            }
          })}
        </Breadcrumb>
      </div>
    )
  } else {
    return <div>wtf</div>
  }
}

export default smart(state => {
  return {
    menu: state.navigation.menu
  }
})(Wrapper)
