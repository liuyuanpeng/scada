import React from 'react'
import { smart, actions } from 'cat-eye'
import style from './style'

const Home = props => {
  return (
    <div className={style.main}>
      <div className={style.title}>欢迎使用高等学校继续教育发展数据采集系统！</div>
    </div>
  )
}

export default smart(
  state => {
    return {
      user: state.user
    }
  },
  props => {
    return {
      changeName() {
        let name = prompt('修改姓名:', props.user.name)
        if (name) {
          name = name.trim()
          if (name) {
            if (name.length > 16) {
              name = name.slice(0, 16)
            }
            actions.user.setField({ name })
          }
        }
      }
    }
  }
)(Home)
