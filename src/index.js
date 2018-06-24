import React from 'react'
import { render, Router } from 'cat-eye'
import { importAll } from 'global/util/sys'
import 'global/cat-eye'
import 'global/request'
import 'global/routes'
import App from './App'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/src/locale/zh-cn'

importAll(require.context('./global/model', true, /.+\.js$/))
importAll(require.context('./components', true, /model\.js$/))

render(
  <Router>
    <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
  </Router>,
  document.getElementById('root')
)
