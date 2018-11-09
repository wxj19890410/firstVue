<template>
    <div class="header_container">
	  <el-button type="primary" @click="loginOut()">退出</el-button>
    </div>
</template>

<script>
    export default {
		methods: {
			loginOut() {
				this.$http.get('/huoli/login/loadInfo').then(({ data }) => {
				    if (data) {
				      this.$message({
				        type: 'success',
				        message: '退出成功'
				      })
				      this.$store.commit('setUserInfo')
                      this.$router.push('/')
				    } else {
				      this.$message({
				        type: 'error',
				        message: data.message
				      })
				    }
				})
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
</style>
