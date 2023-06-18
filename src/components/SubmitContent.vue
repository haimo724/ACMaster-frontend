<template>
  <div style="padding:20px;padding-left: 40px;padding-right:40px">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>状态</span>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="submitDatetime"
                label="日期">
                <template slot-scope="scope">
                    {{formatDate(scope.row.submitDatetime)}}
                </template>
            </el-table-column>
            <el-table-column
                prop="problemId"
                label="题目ID">
            </el-table-column>
            <el-table-column
                prop="authorId"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="judgeStatus"
                label="状态">
                <template slot-scope="scope">
                    <div :class="changeCss(scope.row.judgeStatus)">{{scope.row.judgeStatus == '0'?"答案错误":scope.row.judgeStatus == '1'?"答案正确":""}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="languageId"
                label="语言">
                <template slot-scope="scope">
                    {{scope.row.languageId == 1?"Java":scope.row.languageId == 2?"C":scope.row.languageId == 3?"C++":scope.row.languageId == 4?"Python":scope.row.languageId == 5?"JavaScript":""}}
                </template>
            </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        changeCss(val){
            if(val == 0){
                return "wrong"
            }else{
                return "pass"
            }
        }
    },
    created(){
        let data = ({
            authorID:window.sessionStorage.getItem('schoolId'),
            problemDisplayId:window.sessionStorage.getItem('problemId')
        })
        this.$axios.post('http://127.0.0.1:9090/problem/submitStatus',data).then((response)=>{
            if(response.data.code=='201'){
                for(var i = 0;i<response.data.data.length;i++){
                    this.tableData.push(response.data.data[i])
                }
            }else{
                this.$message.error(({
                    message:response.data.message
                }))
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

</script>
<style>
.pass{
    width:84px;background-color: rgb(45, 231, 45);text-align: center;color:aliceblue;border:1px solid;border-radius:5px
}
.wrong{
    width:84px;background-color: red;text-align: center;color:aliceblue;border:1px solid;border-radius:5px
}
</style>