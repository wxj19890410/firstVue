<template>
  <div class="fillcontain">
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog :title="selectTable.id?'编辑部门':'新建部门'" v-model="showDialog">
          <el-form :model="selectTable">
              <el-form-item label="部门名称" label-width="100px">
                  <el-input v-model="selectTable.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="部门类型" label-width="100px">
                  <el-select v-model="selectTable.deptType" :placeholder="selectTable.deptType">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
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
      count: 0,
      pageSize: 15,
      currentPage: 1,
      tableData: [],
      options: [{
          value: '1',
          label: '生成部门'
      }, {
          value: '2',
          label: '非生产部门'
      }],
      selectTable: {deptType: '1'},
      address: {}
    }
  },
  created () {
    this.initData()
  },
  components: {
  },
  methods: {
    refreshDept () {
      this.$http.get('/huoli/wxData/refreshDept').then(({ data }) => {
        if (data && data.errcode ===0) {

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
    },
    async handleDelete (index, row) {
      const params = {}
      params.id = row.id
      this.$http.post('/org/deleteDept', params).then(({ data }) => {
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
      params.deptType = this.selectTable.deptType
      this.$http.post('/org/saveDept', params).then(({ data }) => {
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
