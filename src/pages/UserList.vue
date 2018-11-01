<template>
    <div class="fillcontain">
      <el-row style="margin-top: 20px;">
        <el-col :span="14" :offset="1">
          <el-button type="primary" @click="updateUser">更新职员列表</el-button>
        </el-col>
      </el-row>
        <div class="table_container">
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
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        </div>
        <el-dialog title="人员归属" v-model="showDialog">
          <el-form :model="selectTable">
              <el-form-item label="部门类型" label-width="100px">
                  <el-select v-model="selectTable.deptType" @change="deptTypeChange" :placeholder="selectTable.deptType">
                      <el-option
                          v-for="item in deptTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
                  <el-select v-model="selectTable.deptId" :placeholder="selectTable.deptId">
                      <el-option
                          v-for="item in deptList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择组织" label-width="100px">
                  <el-select v-model="selectTable.groupId" :placeholder="selectTable.groupId">
                      <el-option
                          v-for="item in groupList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateRelation">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      address: {},
      groupList: [],
      deptList: [],
      deptTypes: [{
          value: '1',
          label: '生成部门'
      }, {
          value: '2',
          label: '非生产部门'
      }],
      selectTable: {deptType: '1'},
      showDialog: false
    }
  },
  created () {
    this.initData()
  },
  components: {
  },
  methods: {
    getGroupList(){
      this.$http.get('/org/findGroup').then(({ data }) => {
        if (data) {
          this.groupList = data
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    deptTypeChange() {
      this.deptList = []
      const params = {}
      params.deptType = this.selectTable.deptType
      this.$http.get('/org/findDept',{params:params}).then(({ data }) => {
        if (data) {
          this.deptList = data
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    handleEdit (index, row) {
      this.selectTable = row
      this.selectTable.deptType = '1'
      this.deptTypeChange()
      this.getGroupList()
      this.showDialog = true
    },
    initData () {
      this.$http.get('/user/findUserList').then(({ data }) => {
        if (data) {
          this.tableData = data
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
    updateUser (index, row) {

    },
    async updateRelation () {
      this.showDialog = false
      const params = {}
      if(this.selectTable.id){
        params.id = this.selectTable.id
      }
      if(this.selectTable.name){
        params.name = this.selectTable.name
      }
      params.type = this.selectTable.deptType
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
