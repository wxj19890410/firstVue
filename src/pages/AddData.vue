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
            <el-button type="primary" @click="addFood()">原数据计算</el-button>
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
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="店铺名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="店铺介绍">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                      <el-form-item label="评分">
                        <span>{{ props.row.rating }}</span>
                      </el-form-item>
                      <el-form-item label="销售量">
                        <span>{{ props.row.recent_order_num }}</span>
                      </el-form-item>
                      <el-form-item label="分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="店铺名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="店铺地址"
                  prop="address">
                </el-table-column>
                <el-table-column
                  label="店铺介绍"
                  prop="description">
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
        <div class="table_container" v-show = "activityValue==='1'">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="店铺名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="店铺介绍">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                      <el-form-item label="评分">
                        <span>{{ props.row.rating }}</span>
                      </el-form-item>
                      <el-form-item label="销售量">
                        <span>{{ props.row.recent_order_num }}</span>
                      </el-form-item>
                      <el-form-item label="分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="店铺名称2"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="店铺地址2"
                  prop="address">
                </el-table-column>
                <el-table-column
                  label="店铺介绍3"
                  prop="description">
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
      currentPage: 1,
      selectTable: {}
    }
  },
  components: {
  },
  created () {
    this.initData()
  },
  methods: {
    getResturants() {
      const params = {}
      params.month = this.sysFile.month
      params.fileId = this.sysFile.id
      //展示源数据
      this.$http.get('/data/findOriginal', {params: params}).then(({ data }) => {
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getResturants()
    },
    initData () {
      try {
        //
      } catch (err) {
        console.log(err)
      }
    },
    uploadImg (res, file) {
      if (res.id) {
        this.sysFile = res
        this.getResturants
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

