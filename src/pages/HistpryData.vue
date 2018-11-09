<template>
    <div class="fillcontain">
      <HeadTop></HeadTop>
      <div class="table_container">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="数据时间"
              prop="month">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="上传时间"
              prop="createDate">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看数据</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="Pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="count">
            </el-pagination>
        </div>
      </div>
      <el-dialog title="详情" v-model="showDialog">
          <div class="table_container">
            <el-table
                :data="tableData2"
                  style="width: 120%">
              <el-table-column
                  label="姓名"
                  prop="userName">
              </el-table-column>
              <el-table-column
                label="号码"
                prop="mobile" style="width: 200%">
              </el-table-column>
              <el-table-column
                label="学习 成长"
                prop="study">
              </el-table-column>
              <el-table-column
                label="读书 指数"
                prop="read">
              </el-table-column>
              <el-table-column
                label="企业 文化"
                prop="culture">
              </el-table-column>
              <el-table-column
                label="出勤 指数"
                prop="attendance">
              </el-table-column>
              <el-table-column
                label="HSE"
                prop="hse">
              </el-table-column>
              <el-table-column
                label="精益 改善"
                prop="improve">
              </el-table-column>
              <el-table-column
                label="总指数"
                prop="total">
              </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page="currentPage2"
                  :page-size="pageSize2"
                  layout="total, prev, pager, next"
                  :total="count2">
                </el-pagination>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">关闭</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import HeadTop from '../components/HeadTop'
export default {
  components: {
    HeadTop
  },
  data () {
    return {
      showDialog: false,
      pageSize: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      pageSize2: 10,
      count2: 0,
      tableData2: [],
      currentPage2: 1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      const params = {}
      params.start = (this.currentPage - 1) * this.pageSize
      params.length = this.pageSize
      this.$http.get('/huoli/data/fileDatagrid', {params: params}).then(({ data }) => {
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
      this.initData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initData()
    },
    handleEdit (index, row) {
      if(!this.selectTable || this.selectTable.id !== row.id){
        this.currentPage2 = 1
        this.selectTable = row
        this.getDetailInfo()
      }
      this.showDialog = true
    },
    getDetailInfo() {
      const params = {}
      params.fileId = this.selectTable.id
      params.start = (this.currentPage2 - 1) * this.pageSize2
      params.length = this.pageSize2
      //展示源数据
      this.$http.get('/huoli/data/dataDataGrid', {params: params}).then(({ data }) => {
        if (data) {
          this.tableData2 = data.rows
          this.count2 = data.count
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    handleSizeChange2 (val) {
      this.currentPage2 = val
      this.getDetailInfo()
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      this.getDetailInfo()
    }
  }
}
</script>

<style lang="less">
  @import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
