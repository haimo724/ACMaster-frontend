<template>
  <div v-loading="loading">
      <el-table
        
        :data="tableData"
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.date) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题">
          <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="250px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleView(scope.$index, scope.row,scope.row.id)">查看</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row,scope.row.id)">编辑</el-button>
            <!-- <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row,scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除</el-button>
            </el-popconfirm> -->
            <!-- <el-popover width="160" :ref="`popover-${scope.$index}`">
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="text" size="mini" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">
                  取消
                </el-button>
                <el-button type="danger" size="mini" >确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除</el-button>
            </el-popover> -->
            <el-popover
              placement="right"
              width="160"
              :ref="`popover-${scope.$index}`">
              <p>您确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row,scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini"  style="margin-left:10px">删除</el-button>
            </el-popover>
            <!-- <el-popover
              placement="top"
              width="160"
              :v-model="visible">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
              <el-button slot="reference">删除</el-button>
            </el-popover> -->
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
          layout="prev, pager, next"
          :total="50" style="text-align:center">
      </el-pagination> -->
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
        return new Date(val).format('Y-m-d H:i:s')
    },
    cancel(){
      console.log(this.visible)
      this.visible = false
    },
    handleView(index, row,id) {
      window.sessionStorage.removeItem('slogId')
      window.sessionStorage.setItem('slogId',id)
      this.$router.push({path:'/slogdetail'})
    },
    handleEdit(index,row){
      window.sessionStorage.removeItem('slogId')
      window.sessionStorage.setItem('slogId',row.id)
      window.sessionStorage.removeItem('content')
      window.sessionStorage.setItem('content',row.content)
      window.sessionStorage.removeItem('correspondingId')
      window.sessionStorage.setItem('correspondingId',row.correspondingId)
      window.sessionStorage.removeItem('correspondingTitle')
      window.sessionStorage.setItem('correspondingTitle',row.correspondingTitle)
      window.sessionStorage.removeItem('correspondingLink')
      window.sessionStorage.setItem('correspondingLink',row.correspondingLink)
      window.sessionStorage.removeItem('title')
      window.sessionStorage.setItem('title',row.title)
      window.sessionStorage.removeItem('tagList')
      window.sessionStorage.setItem('tagList',row.tagList)
      this.$router.push({path:'/updateslog'})
    },
    handleDelete(index, row,id) {
      let data = ({
        slogId:id
      })
      this.$axios.post('http://127.0.0.1:9090/slog/deleteSlog',data).then((response)=>{
        if(response.data.code=='201'){
          this.$message({
            message:response.data.message,
            type:'success'
          })
          setTimeout(()=>{
              location.reload()
          },1000)
        }else{
          this.$message.error({
            message:response.data.message
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      this.loading = true
      // setTimeout(()=>{
      //   this.loading = false
      // },1200)
      this.page.currentPage = val;
      let data = ({
        page:(this.page.currentPage-1)*this.page.size,
        schoolId:window.sessionStorage.getItem('schoolId')
      })
      this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/drafts',data).then((response)=>{
          if(response.data.code == '201'){
            this.loading = false
              this.tableData.length = 0
              for(var i=0;i<response.data.data.listFromPage.length;i++){
                let asd = response.data.data.listFromPage[i].title
                let num = ({
                  id:response.data.data.listFromPage[i].id,
                  date:response.data.data.listFromPage[i].publishDatetime,
                  title2: asd,
                  title:response.data.data.listFromPage[i].title,
                  content:response.data.data.listFromPage[i].content,
                  correspondingId:response.data.data.listFromPage[i].correspondingId,
                  correspondingTitle:response.data.data.listFromPage[i].correspondingTitle,
                  correspondingLink:response.data.data.listFromPage[i].correspondingLink,
                  tagList:response.data.data.listFromPage[i].tagNameList
                })
                setTimeout(()=>{})
                this.tableData.push(num)
              }
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
    }
  },
  created(){
      this.loading = true
      // setTimeout(()=>{
      //   this.loading = false
      // },1200)
      let data = ({
          page:0,
          schoolId:window.sessionStorage.getItem('schoolId')
      })
      this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/drafts',data).then((response)=>{
          
          if(response.data.code == '201'){
              this.loading = false
              for(var i=0;i<response.data.data.listFromPage.length;i++){
                let asd = response.data.data.listFromPage[i].title
                let num = ({
                  id:response.data.data.listFromPage[i].id,
                  date:response.data.data.listFromPage[i].publishDatetime,
                  title2: asd,
                  title:response.data.data.listFromPage[i].title,
                  content:response.data.data.listFromPage[i].content,
                  correspondingId:response.data.data.listFromPage[i].correspondingId,
                  correspondingTitle:response.data.data.listFromPage[i].correspondingTitle,
                  correspondingLink:response.data.data.listFromPage[i].correspondingLink,
                  tagList:response.data.data.listFromPage[i].tagNameList
                })
                // setTimeout(()=>{
                //   this.tableData.push(num)
                //   this.page.currentPage = response.data.data.current
                //   this.page.size = response.data.data.size
                //   this.page.totalPage = response.data.data.totalPage
                // },700)
                this.tableData.push(num)
                  this.page.currentPage = response.data.data.current
                  this.page.size = response.data.data.size
                  this.page.totalPage = response.data.data.totalPage
                // this.tableData.push(num)
                // this.loading=false
              }
            // this.page.currentPage = response.data.data.current
            // this.page.size = response.data.data.size
            // this.page.totalPage = response.data.data.totalPage
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
<style scoped>
</style>