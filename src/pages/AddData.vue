<template>
  <div>
    <el-row style="margin-top: 20px;">
  		<el-col :span="14" :offset="4">
  			<header class="form_header">添加数据</header>
  			<el-form  label-width="110px" class="form food_form">
  				<el-form-item label="上传Excel">
  					<el-upload
  					  class="avatar-uploader"
  					  :action="uploadUrl"
  					  :show-file-list="false"
  					  :on-success="uploadImg"
              :headers="headers"
  					  :before-upload="beforeImgUpload">
  					  <i>上传图片</i>
  					</el-upload>
  				</el-form-item>
          <el-form-item label="列表数据">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="setResultData()">原数据计算</el-button>
            <el-button type="primary" @click="refreshUser()">更新人员</el-button>
            <el-button type="primary" @click="refreshDept()">更新部门</el-button>
            <el-button type="primary" @click="refreshGroup()">更新班组</el-button>
  					<el-button type="primary" @click="addFood()">推送消息</el-button>
  				</el-form-item>
  			</el-form>
  		</el-col>
  	</el-row>
    <div class="fillcontain">
        <div class="table_container" v-show = "activityValue==='0'">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="姓名"
                  prop="userName">
                </el-table-column>
                <el-table-column
                  label="号码"
                  prop="phone">
                </el-table-column>
                <el-table-column
                  label="学习成长"
                  prop="study">
                </el-table-column>
                <el-table-column
                  label="读书指数"
                  prop="read">
                </el-table-column>
                <el-table-column
                  label="企业文化"
                  prop="culture">
                </el-table-column>
                <el-table-column
                  label="出勤指数"
                  prop="attendance">
                </el-table-column>
                <el-table-column
                  label="HSE"
                  prop="hse">
                </el-table-column>
                <el-table-column
                  label="精益改善"
                  prop="improve">
                </el-table-column>
                <el-table-column
                  label="总指数"
                  prop="total">
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
	    uploadUrl: window.GLOBLE.apiUrl + '/file/upload',
      headers: {
        loginUuid: this.$service.localStorage.get('loginUuid')
      },
      options: [{
          value: '0',
          label: '原数据'
      }, {
          value: '1',
          label: '最终数据'
      }],
      activityValue: '0',
      sysFile: null,
      offset: 0,
      count: 0,
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      selectTable: {}
    }
  },
  components: {
  },
  created () {
    this.getResturants()
  },
  methods: {
    getResturants() {
      const params = {}
      //params.month = this.sysFile.month
      params.fileId = 1
      params.start = (this.currentPage - 1) * this.pageSize
      params.length = this.pageSize
      //展示源数据
      this.$http.get('/data/dataDataGrid', {params: params}).then(({ data }) => {
        if (data) {
          this.tableData = data.rows
          this.count = data.count
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = val
      this.getResturants()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getResturants()
    },
    uploadImg (res, file) {
      if (res.id) {
        this.sysFile = res
        this.getResturants()
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
    setResultData(){
      const params = {}
      params.month = '2018-11'
      //展示处理数据
      this.$http.post('/data/setAverageData', params).then(({ data }) => {
        if (data) {
          console.log(data)
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    refreshUser () {
      this.$http.get('/wxData/refreshUser').then(({ data }) => {
        if (data) {
          console.log(data)
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    refreshGroup () {
      this.$http.get('/huoli/wxData/refreshTag').then(({ data }) => {
        if (data && data.errcode ===0) {

        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },

    addFood () {
    },
    selectActivity(){
      const params = {}
      params.month = this.sysFile.month
      params.fileId = this.sysFile.id
      //展示处理数据
      this.$http.get('/data/findResult', {params: params}).then(({ data }) => {
        if (data) {
          console.log(data)
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

