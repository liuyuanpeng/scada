import ce, {
  request
} from 'cat-eye'
import moment from 'moment'

const {
  api
} = request

const curYear = moment().year()
const startYear = 2015
let years = []
for (let i = curYear; i >= startYear; i--) {
  years.push(`${i}`)
}

ce.model({
  name: 'page',
  state: {
    year: localStorage.getItem('curYear') ? parseInt(localStorage.getItem('curYear')) : `${curYear}`,
    years,
    types: {},
    type: ''
  },
  reducers: {
    setYear(year) {
      localStorage.setItem('curYear', year)
      return this.setField({
        year
      })
    },
    setType(type) {
      return this.setField({
        type
      })
    }
  },
  effects: {
    getTypes(type, allState) {
      if (this.getState().types && this.getState().types.hasOwnProperty(type)) {
        if (!this.getState().type) {
          this.setField({
            type: this.getState().types[type][0].code
          })
        }
        return
      }
      if (allState().openConifg && allState().openConifg.hasOwnProperty(type)) {
        this.setField({
          types: {...this.getState(), ...allState().openConfig.data},
          type: allState().openConifg.data[type][0].code
        })
        return
      }
      return api
        .get('/open-config/list-by-config', {
          params: {
            'config-code': type
          },
          complete: () => {
            this.setField({
              loading: false
            })
          }
        })
        .then(res => {
          let types = {...this.getState().types}
          types[type] = res.data.config_enums.map(item => {
            return item.config_enum
          })
          types && this.setField({
            types,
            type: types[type][0].code
          })
        })
    }
  }
})
