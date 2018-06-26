import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'schoolRules', // 学校规章制度
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		importExcelData(formData) {
			// 导入学校继续教育规章制度建设excel表格
			return api
				.post('/college-regulation/import', {
					headers: {
						'Content-Type': 'multipart/form-data' //设置post文件的请求头
					},
					data: formData,
					complete: () => {
						this.setField({
							loading: false
						})
					}
				})
				.then(res => {
					this.setField({
						data: res ? res.data : []
					})
				})
		},
		getList() {
			// 获取学校继续教育规章制度建设列表
			return api
				.get('/college-regulation/list', {
					complete: () => {
						this.setField({
							loading: false
						})
					}
				})
				.then(res => {
					this.setField({
						data: res ? res.data : []
					})
				})
		},
		getByRegulationId(regulationId) {
			// 获取学校继续教育规章制度建设
			return api
				.get('/college-regulation/' + regulationId, {
					complete: () => {
						this.setField({
							loading: false
						})
					}
				})
				.then(res => {
					this.setField({
						data: res ? res.data : []
					})
				})
		},
		saveRegulation(regulation) {
			// 创建/更新学校继续教育规章制度
			return api
				.post('/college-regulation/save', {
					data: regulation,
					complete: () => {
						this.setField({
							loading: false
						})
					}
				})
				.then(res => {
					this.setField({
						data: res ? res.data : []
					})
				})
		},
		deleteByRegulationId(regulationId) {
			// 删除学校继续教育规章制度
			return api
				.delete('/college-regulation/' + regulationId, {
					complete: () => {
						this.setField({
							loading: false
						})
					}
				})
				.then(res => {
					this.setField({
						data: res ? res.data : []
					})
				})
		}
  }
})
