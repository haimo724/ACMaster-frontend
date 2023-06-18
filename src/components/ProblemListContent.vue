<template>
  <div style="padding:50px;padding-left: 100px;padding-right:100px;">
    <el-row :gutter="20">
        <el-col :span="20"><div class="grid-content bg-purple">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>题目列表</span>
                   <el-dropdown @command="handleCommand" style="float:right">
                        <span class="el-dropdown-link">
                            {{val}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="低">低</el-dropdown-item>
                            <el-dropdown-item command="中">中</el-dropdown-item>
                            <el-dropdown-item command="高">高</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    style="width: 100%">
                    <el-table-column
                        prop="displayId"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="题目名称">
                        <template slot-scope="scope">
                             <a @click="toDetail(scope.row)" class="light">{{scope.row.title}}</a>
                        </template>
                       
                    </el-table-column>
                    <el-table-column
                        prop="rank"
                        label="题目难度">
                        <template slot-scope="scope">
                            <div :class="changeCss(scope.row.rank)">{{scope.row.rank == 1?"低":scope.row.rank == 2?"中":scope.row.rank == 3?"高":""}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="提交总数">
                        <template slot-scope="scope">
                            {{totalSubmit(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="通过率">
                        <template slot-scope="scope">
                            {{passRate(scope.row)}}%
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tags"
                        label="标签"
                        width="300px">
                        <template slot-scope="scope">
                            <el-tag type="info" v-for="(item,index) in scope.row.tags" :key="index" style="margin-right:5px;margin-top:5px">{{item}}</el-tag>
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
                    style="text-align:center;margin-top: 7px;background-color: rgba(255, 255, 255, 0.96)">
                </el-pagination>
            </el-card>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
            <el-card class="box-card" style="min-height:300px">
                <div slot="header" class="clearfix">
                    <span>标签</span>
                </div>
                <div v-for="(item,index) in tags" :key="index" class="text item" >
                    <el-tag type="info" style="float:left;margin:5px">{{item.name}}</el-tag>
                </div>
            </el-card>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
        val:'难度',
        tableData: [],
        page:{
        currentPage:1,
        size:10,
        totalPage:1
        },
        tags:[],
        loading:false
        }
    },
    methods: {
        handleCommand(command) {
            this.val = command
            let data
            if(this.val == '低'){
                data = ({
                    page:0,
                    rank:1
                })
            }
            if(this.val == '中'){
                data = ({
                    page:0,
                    rank:2
                })
            }
            if(this.val == '高'){
                data = ({
                    page:0,
                    rank:3
                })
            }
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/queryByDifficulty',data).then((response)=>{
                if(response.data.code == '201'){
                    this.tableData.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.tableData.push(response.data.data.listFromPage[i])
                    }
                    this.page.currentPage = response.data.data.current
                    this.page.size = response.data.data.size
                    this.page.totalPage = response.data.data.totalPage
                }else{
                    this.$message.error({
                        message:response.data.message
                    })
                }
            })
        },
        toDetail(val){
            window.sessionStorage.removeItem('problemId')
            window.sessionStorage.setItem('problemId',val.id)
            window.sessionStorage.removeItem('code')
            window.sessionStorage.removeItem('language')
            this.$router.push({path:'/problemdetail'})
        },
        changeCss(val){
            if(val == 1){
                return "easy"
            }else if(val == 2){
                return "medium"
            }else{
                return "hard"
            }
        },
        handleCurrentChange(val) {
            this.loading = true
            this.page.currentPage = val;
            let data
            if(this.val == '难度'){
                data = ({
                page:(this.page.currentPage-1)*this.page.size
                })
                this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/get',data).then((response)=>{
                   if(response.data.code == '201'){
                        this.loading = false
                        this.tableData.length = 0
                        for(var i=0;i<response.data.data.listFromPage.length;i++){
                            this.tableData.push(response.data.data.listFromPage[i])
                        }
                        this.page.currentPage = response.data.data.current
                        this.page.size = response.data.data.size
                        this.page.totalPage = response.data.data.totalPage
                    }else{
                        this.$message.error({
                            message:response.data.message
                        })
                    }
                })
            }else{
                if(this.val == '低'){
                    data = ({
                        page:(this.page.currentPage-1)*this.page.size,
                        rank:1
                    })
                }
                if(this.val == '中'){
                    data = ({
                        page:(this.page.currentPage-1)*this.page.size,
                        rank:2
                    })
                }
                if(this.val == '高'){
                    data = ({
                        page:(this.page.currentPage-1)*this.page.size,
                        rank:3
                    })
                }
                this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/queryByDifficulty',data).then((response)=>{
                    if(response.data.code == '201'){
                        this.tableData.length = 0
                        for(var i=0;i<response.data.data.listFromPage.length;i++){
                            this.tableData.push(response.data.data.listFromPage[i])
                        }
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
        totalSubmit(val){
            return val.submissionPass+val.submissionWrong
        },
        passRate(val){
            var zero = 0
            if(val.submissionPass+val.submissionWrong==0){
                return zero.toFixed(2)
            }else{
                return (val.submissionPass*1.0/(val.submissionPass+val.submissionWrong)*100).toFixed(2)
            }
            
        }
    },
    computed:{
        
    },
    created(){
        this.loading = true
        // setTimeout(()=>{
        //     this.loading = false
        // },800)
        let data = ({
            page:(this.page.currentPage-1)*this.page.size
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/get',data).then((response)=>{
            if(response.data.code == '201'){
                this.loading = false
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.tableData.push(response.data.data.listFromPage[i])
                }
                this.page.currentPage = response.data.data.current
                this.page.size = response.data.data.size
                this.page.totalPage = response.data.data.totalPage
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        })
        let data2 = ({
            type:1
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/getTags',data2).then((response)=>{
            if(response.data.code == '201'){
                this.tags = response.data.data
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        })
    }
}

</script>
<style scoped>
.light:hover{
    color: #29E6D3;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.el-dropdown-link {
    cursor: pointer;
    color: black;
}
.el-icon-arrow-down {
    font-size: 12px;
}

    .easy{
        width:24px;background-color: #28d492;text-align: center;color:aliceblue;border:1px solid;border-radius:5px
    }
    .medium{
        width:24px;background-color: #2d8cf0;text-align: center;color:aliceblue;border:1px solid;border-radius:5px
    }
    .hard{
        width:24px;background-color: #f90;text-align: center;color:aliceblue;border:1px solid;border-radius:5px
    }
</style>