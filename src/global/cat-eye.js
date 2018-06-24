import ce, { rr, router, pathToRegexp, actions } from 'cat-eye'
import { flatMenu } from 'global/menu'
const { LOCATION_CHANGE } = rr

let _init = true

let flatRouter

function getMenu(url) {
  let match = false
  if (!flatRouter) {
    flatRouter = router.getFlat()
  }
  let routeKey
  Object.keys(flatRouter).some(key => {
    const item = flatRouter[key]
    if (item) {
      const re = pathToRegexp(item.path)
      if (re.exec(url)) {
        routeKey = key
        return true
      }
    }
  })
  if (routeKey) {
    const arr = routeKey.split('.')
    while (arr.length) {
      const key = arr.join('.')
      let menu = flatMenu[key]
      if (menu) {
        if (_init) {
          _init = false
          actions.navigation.setMenu({
            keyPath: menu.keyPath,
            init: true
          })
        } else {
          actions.navigation.setMenu({
            keyPath: menu.keyPath
          })
        }
        match = true
        break
      } else {
        arr.pop()
      }
    }
  }
  return match
}

ce.hook((action, getState) => {
  if (action.type === LOCATION_CHANGE) {
    const url = action.payload.pathname
    const arr = url.split('/')
    let match
    for (let i = arr.length; i > 0; i--) {
      match = getMenu(arr.slice(0, i).join('/'))
      if (match) {
        break
      }
    }
    if (!match) {
      if (_init) {
        _init = false
        actions.navigation.setMenu({
          init: true
        })
      } else {
        actions.navigation.setMenu()
      }
    }
  }
})
