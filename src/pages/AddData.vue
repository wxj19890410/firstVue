<template>
    <div>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">添加食品</header>
	  			<el-form>
						<el-form-item label="上传食品图片">
							<el-upload
							  class="avatar-uploader"
							  :action="uploadUrl"
							  :show-file-list="false"
							  :on-success="uploadImg"
							  :before-upload="beforeImgUpload">
							  <i >上传图片</i>
							</el-upload>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addFood()">确认数据</el-button>
						</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
import {baseImgPath} from '@/config/env'
export default {
  data () {
    return {
    	uploadUrl: window.GLOBLE.apiUrl + '/user/upload',
      baseImgPath
    }
  },
  components: {
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      try {
        //
      } catch (err) {
        console.log(err)
      }
    },
    uploadImg (res, file) {
      if (res.status === 1) {

      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeImgUpload (file) {
    	let filename = file.name
    	let arr = filename.split('.')
      const isRightType = ['xlsx', 'xls'].includes(arr[1])
      if (!isRightType) {
        this.$message.error('只能上传Excel!')
      }
      return isRightType
    },
    addFood () {
    }
  }
}
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
