import ce, { request } from 'cat-eye'
const { api } = request

ce.model({
  name: 'college',
  state: {
  		data: []
  },
  reducers: {},
  effects: {
  		getList() {
  			// 获取学校基本信息列表
  			return api
  				.get('/college/list', {
  					complete: () => {
	          this.setField({ loading: false })
	        }
  				})
  				.then(res => {
  					this.setField({
	          data: res ? res.data : []
	        })
  				})
  		},
	  	getByCollegeId(collegeId) {
	  		// 获取学校基本信息 by college id
	  	  return api
	      .get('/college/id/' + collegeId, {
	        complete: () => {
	          this.setField({ loading: false })
	        }
	      })
	      .then(res => {
	        this.setField({
	          data: res ? res.data : []
	        })
	      })
	  	},
	  	getByCollegeCode(collegeCode) {
	  		// 获取学校基本信息 by college code
	  	  return api
	      .get('/college/code/' + collegeCode, {
	        complete: () => {
	          this.setField({ loading: false })
	        }
	      })
	      .then(res => {
	        this.setField({
	          data: res ? res.data : []
	        })
	      })
	  	},
	  	addCollege(college) {
	  		// 创建学校基本信息
	  		return api
	  			.post('/college/create', {
	  				data: college,
	  				complete: () => {
	          this.setField({ loading: false })
	        }
	  			})
	  			.then(res => {
	  				this.setField({
	          data: res ? res.data : []
	        })
	  			})
	  	},
	  	saveCollege(college) {
	  		// 更新学校基本信息
	  	  return api
		  	  	.put('/college/save', {
		  	  		data: college,
		  	  		complete: () => {
	          this.setField({ loading: false })
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
