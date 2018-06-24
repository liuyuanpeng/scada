import ce from 'cat-eye'
import { getMenu } from 'global/menu'

ce.model({
  name: 'navigation',
  state: {
    openKeys: [], // 打开菜单的状态
    menu: [] // 当前高亮的菜单（包括其祖先菜单）
  },
  reducers: {
    setMenu(data = {}) {
      const { keyPath, init } = data
      let pointer = getMenu()
      const arr = []
      let openKeys
      if (init) {
        openKeys = localStorage.getItem('openKeys')
        if (openKeys) {
          openKeys = openKeys.split('/')
        }
      }
      let noCache
      if (!openKeys) {
        noCache = true
        openKeys = []
      }
      if (keyPath) {
        keyPath.forEach((i, index) => {
          let current
          i = parseInt(i, 10)
          current = index === 0 ? pointer[i] : pointer.sub[i]
          arr.push(current)
          if (noCache) {
            openKeys.push(current.keyPath.join('-'))
          }
          pointer = current
        })
      }
      if (openKeys.length === 0) {
        openKeys = ['0']
      }
      if (init) {
        return this.setField({
          menu: arr,
          openKeys
        })
      } else {
        return this.setField({
          menu: arr
        })
      }
    },
    setOpenKeys(openKeys) {
      localStorage.setItem('openKeys', openKeys.join('/'))
      return this.setField({
        openKeys
      })
    }
  },
  effects: {}
})
