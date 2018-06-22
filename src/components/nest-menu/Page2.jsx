import React from 'react'
import { Card } from 'antd'
import style from './style'

export default props => {
  return (
    <Card bordered={false} title="钗头凤·红酥手" className={style.card}>
      <div className={style.section}>
        <p>红酥手，黄縢酒，满城春色宫墙柳。</p>
        <p>东风恶，欢情薄。</p>
        <p>一怀愁绪，几年离索。</p>
        <p>错、错、错。</p>
      </div>
      <div className={style.section}>
        <p>春如旧，人空瘦，泪痕红浥鲛绡透。</p>
        <p>桃花落，闲池阁。</p>
        <p>山盟虽在，锦书难托。</p>
        <p>莫、莫、莫！</p>
      </div>
    </Card>
  )
}
