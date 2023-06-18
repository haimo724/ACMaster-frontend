<template>
  <div v-loading="loading">
      <el-table
        
        :data="tableData"
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.submitDatetime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目编号">
          <template slot-scope="scope">
            <p>{{scope.row.problemId}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <div :class="changeCss(scope.row.judgeStatus)">{{scope.row.judgeStatus == '0'?"答案错误":scope.row.judgeStatus == '1'?"答案正确":""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleView(scope.$index, scope.row,scope.row.problemId)">查看</el-button>
            <!-- <el-popover
              placement="right"
              width="160"
              :ref="`popover-${scope.$index}`">
              <p>您确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row,scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除</el-button>
            </el-popover> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          layout="total,prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.size"
          :pager-count="7"
          :page-count="page.totalPage"
          style="text-align:center">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tableData: [],
        currentRow: null,
        page:{
          currentPage:null,
          size:null,
          totalPage:null
        },
        visible:false,
        loading:false
      }
  },
  methods:{
    formatDate(val){
        return new Date(val).format('Y-m-d H-i-s')
    },
    changeCss(val){
        if(val == 0){
            return "wrong"
        }else{
            return "pass"
        }
    },
    cancel(){
      console.log(this.visible)
      this.visible = false
    },
    handleView(index, row,id) {
      window.sessionStorage.removeItem('problemId')
      window.sessionStorage.setItem('problemId',id)
      window.sessionStorage.removeItem('code')
      window.sessionStorage.setItem('code',row.code)
      window.sessionStorage.removeItem('language')
      window.sessionStorage.setItem('language',row.languageId)
      this.$router.push({path:'/problemdetail'})
    },
    // handleDelete(index, row,id) {
    //   let data = ({
    //     submissionId : id,
    //     schoolId:window.sessionStorage.getItem('schoolId')
    //   })
    //   console.log(id)
    //   this.$axios.post('http://127.0.0.1:9090/user/submissiondelete',data).then((response)=>{
    //     if(response.data.code=='201'){
    //       this.$message({
    //         message:response.data.message,
    //         type:'success'
    //       })
    //       setTimeout(()=>{
    //           location.reload()
    //       },1000)
    //     }else{
    //       this.$message.error({
    //         message:response.data.message
    //       })
    //     }
    //   }).catch((error)=>{
    //     console.log(error)
    //   })
    // },
    handleCurrentChange(val) {
      this.loading = true
      this.page.currentPage = val;
      let data = ({
        page:(this.page.currentPage-1)*this.page.size,
        schoolId:window.sessionStorage.getItem('schoolId')
      })
      this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/user/submissionList',data).then((response)=>{
          if(response.data.code == '201'){
            this.loading = false
              this.tableData.length = 0
              this.tableData = response.data.data.listFromPage
              this.page.currentPage = response.data.data.current
              this.page.size = response.data.data.size
              this.page.totalPage = response.data.data.totalPage
          }else{
              this.$message.error({
                  message:response.data.message
              })
          }
      })
    }
  },
  created(){
      this.loading = true
      // setTimeout(()=>{
      //   this.loading = false
      // },800)
      let data = ({
          page:0,
          schoolId:window.sessionStorage.getItem('schoolId')
      })
      this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/user/submissionList',data).then((response)=>{
          if(response.data.code == '201'){
            this.loading = false
            this.tableData = response.data.data.listFromPage
            this.page.currentPage = response.data.data.current
            this.page.size = response.data.data.size
            this.page.totalPage = response.data.data.totalPage
          }else{
              this.$message.error({
                  message:response.data.message
              })
          }
      }).catch((error)=>{
        console.log(error)
      })
  },
}
</script>
<style>
.pass{
    width:84px;background-color: rgb(36, 201, 36);text-align: center;color:aliceblue;border:1px solid;border-radius:5px
}
.wrong{
    width:84px;background-color: red;text-align: center;color:aliceblue;border:1px solid;border-radius:5px
}
</style>