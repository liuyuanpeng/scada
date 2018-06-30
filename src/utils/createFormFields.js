import { Form } from 'antd'

export default (props) => {
  let maps = {}
  props && Object.keys(props).map(key => {
    maps[key] = Form.createFormField({
      value: props[key]
    })
  })
  return maps
}
