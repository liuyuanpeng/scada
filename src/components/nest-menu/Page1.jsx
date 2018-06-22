import React from 'react'
import { Card } from 'antd'
import style from './style'

export default props => {
  return (
    <Card bordered={false} title="水调歌头·明月几时有" className={style.card}>
      <div className={style.section}>
        <p>明月几时有？把酒问青天。</p>
        <p>不知天上宫阙，今夕是何年。</p>
        <p>我欲乘风归去，又恐琼楼玉宇，高处不胜寒。</p>
        <p>起舞弄清影，何似在人间？</p>
      </div>
      <div className={style.section}>
        <p>转朱阁，低绮户，照无眠。</p>
        <p>不应有恨，何事长向别时圆？</p>
        <p>人有悲欢离合，月有阴晴圆缺，此事古难全。</p>
        <p>但愿人长久，千里共婵娟。</p>
      </div>
    </Card>
  )
}
