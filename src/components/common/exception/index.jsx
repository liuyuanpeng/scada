import React from 'react'
import { urlFor, Link, actions } from 'cat-eye'
import { Button } from 'antd'
import { EXCEPTION } from 'config/constant'
import style from './style'

export default props => {
  const { title, img, desc, pageType } = props
  return (
    <div className={style.exception}>
      <div className={style.imgBlock}>
        <div className={style.imgEle} style={{ backgroundImage: `url(${img || EXCEPTION[pageType].img})` }} />
      </div>
      <div className={style.content}>
        <h1>{title || EXCEPTION[pageType].title}</h1>
        <div className={style.desc}>{desc || EXCEPTION[pageType].desc}</div>
        <div className={style.actions}>
          <Button>
            <Link to={urlFor('main')}>返回首页</Link>
          </Button>

          <Button type="primary" onClick={actions.routing.goBack}>
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
}
