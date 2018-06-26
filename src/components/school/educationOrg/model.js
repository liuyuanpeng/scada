import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'schoolEducationOrg', // 学校办学机构
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		importExcelData(formData) {
			// 导入继续教育机构基本信息excel表格
			return api
				.post('/organization/import', {
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
			// 获取继续教育机构基本信息列表
			return api
				.get('/organization/list', {
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
		getByOrganizationId(organizationId) {
			// 获取继续教育机构基本信息
			return api
				.get('/organization/' + organizationId, {
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
		saveOrganization(organization) {
			// 创建/更新继续教育机构基本信息
			return api
				.post('/organization/save', {
					data: organization,
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
		deleteByOrganizationId(organizationId) {
			// 删除继续教育机构基本信息
			return api
				.delete('/organization/' + organizationId, {
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
