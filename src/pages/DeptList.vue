<template>
  <div class="fillcontain">
    <HeadTop></HeadTop>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="1">
        <el-button type="primary" @click="refreshDept()">更新部门</el-button>
      </el-col>
    </el-row>
    <div class="table_container">
      <el-table
          :data="tableData"
          style="width: 100%">
           <el-table-column
              label="班组"
              prop="name">
            </el-table-column>
            <el-table-column
              label="人数"
              prop="personNub">
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
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                disabled
                @click="handleEdit(scope.$index, scope.row)">查看历史</el-button>
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
      <el-dialog title="历史数据" v-model="showDialog">
          <div class="table_container">
            <el-table
                :data="tableData2"
                  style="width: 120%">
              <el-table-column
                label="数据时间"
                prop="month">
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
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="showDialog = false">关闭</el-button>
          </div>
        </el-dialog>
    </div>
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
      count: 0,
      pageSize: 15,
      currentPage: 1,
      tableData: [],
      selectTable: {},
      tableData2: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    refreshDept () {
      this.$http.get('/huoli/wxData/refreshDept').then(({ data }) => {
        this.initData()
        if (data && data > 0 ) {
          this.$message({
            type: 'success',
            message: '现有部門' + data + '个'
          })
        }else if(data === 0 ){
          this.$message({
            type: 'success',
            message: '没有部門在使用活力指数！'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    initData () {
      const params = {}
      params.start = (this.currentPage - 1) * this.pageSize
      params.length = this.pageSize
      this.$http.get('/huoli/org/deptDataGrid', {params: params}).then(({ data }) => {
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
      this.selectTable = row
      this.showDialog = true
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
