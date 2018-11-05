<template>
    <div class="fillcontain">
      <el-row style="margin-top: 20px;">
        <el-col :span="14" :offset="1">
          <el-button type="primary" @click="addNewGroup">添加新组</el-button>
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
              prop="address">
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
                  @click="handleEdit(scope.$index, scope.row)">查看人员</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">查看历史</el-button>
              </template>
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
        <el-dialog :title="selectTable.id?'编辑组名':'新建小组'" v-model="showDialog">
          <el-form :model="selectTable">
              <el-form-item label="小组名称" label-width="100px">
                  <el-input v-model="selectTable.name" auto-complete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="updateShop">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showDialog: false,
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      address: {}
    }
  },
  created () {
    this.initData()
  },
  components: {
  },
  methods: {
    addNewGroup () {
      this.selectTable = {}
      this.showDialog = true
    },
    async initData () {
      const params = {}
      params.start = 0
      params.length = 10
      this.$http.get('/huoli/org/groupDataGrid', {params: params}).then(({ data }) => {
        if (data) {
          this.tableData = data.rows
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    async getResturants () {
      this.tableData = []
      console.log('获取数据失败')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getResturants()
    },
    handleEdit (index, row) {
      this.selectTable = row
      this.showDialog = true
    },
    async handleDelete (index, row) {
      console.log(row)
      const params = {}
      params.id = row.id
      this.$http.post('/org/deleteGroup', params).then(({ data }) => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initData()
      })
    },
    async updateShop () {
      this.showDialog = false
      const params = {}
      if(this.selectTable.id){
        params.id = this.selectTable.id
      }
      if(this.selectTable.name){
        params.name = this.selectTable.name
      }
      this.$http.post('/org/saveGroup', params).then(({ data }) => {
        if (data) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.initData()
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
