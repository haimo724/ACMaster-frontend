<template>
  <div class="block" v-loading="loading">
    <!-- <div class="radio" style="margin-bottom:15px;text-align: center;">
        排序：
        <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
        </el-radio-group>
    </div> -->
    <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(item,index) in timeline" :key="index" :timestamp="item.month" placement="top">
        <el-card v-for="(item2,index2) in item.slogList" :key="index2" style="margin-bottom:10px">
            <h4>题解/博客标题：{{item2.title}}</h4>
            <h4>赞：{{item2.goodCount}} 评论数：{{item2.commentCount}}</h4>
            <p>提交于 {{formatDate1(item2.publishDatetime)}}</p>
        </el-card>
        </el-timeline-item>
    </el-timeline>
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
    data(){
        return{
            timeline:[
                // {month:'2022-4',slogList:[{title:'123232',datetime:'2022-4-12'},{title:'123232',datetime:'2022-4-14'}]},
                // {month:'2022-4',slogList:[{title:'123232',datetime:'2022-4-12'},{title:'123232',datetime:'2022-4-14'}]},
                // {month:'2022-4',slogList:[{title:'123232',datetime:'2022-4-12'},{title:'123232',datetime:'2022-4-14'}]},
                // {month:'2022-4',slogList:[{title:'123232',datetime:'2022-4-12'},{title:'123232',datetime:'2022-4-14'}]},
                // {month:'2022-4',slogList:[{title:'123232',datetime:'2022-4-12'},{title:'123232',datetime:'2022-4-14'}]}
            ],
            loading:false,
            reverse:true,
            page:{
                currentPage:null,
                size: null,
                totalPage:null
            },
        }
    },
    methods:{
        formatDate1(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        formatDate2(val){
            return new Date(val).format('Y-m')
        },
        handleCurrentChange(val) {
            this.loading = true
        // setTimeout(()=>{
        //     this.loading = false
        // },1200)
        this.page.currentPage = val;
        let data = ({
            page:(this.page.currentPage-1)*this.page.size,
            schoolId:window.sessionStorage.getItem('schoolId')
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/mySlogList',data).then((response)=>{
            if(response.data.code == '201'){
                this.loading = false
                this.timeline.length = 0
                for(var i = 0;i<response.data.data.listFromPage.length;i++){
                    // this.timeline.push(response.data.data.timeline[i])
                    if(this.timeline.length == 0){
                        // this.timeline.push(this.formatDate2(response.data.data.timeline[i].publishDatetime))
                        let data = {
                            month:this.formatDate2(response.data.data.listFromPage[i].publishDatetime),
                            slogList:[response.data.data.listFromPage[i]]
                        }
                        this.timeline.push(data)
                    }else{
                        let sd = 0
                        for(var j = 0;j<this.timeline.length;j++){
                            if(this.formatDate2(response.data.data.listFromPage[i].publishDatetime) == this.timeline[j].month){
                                this.timeline[j].slogList.push(response.data.data.listFromPage[i])
                                sd = 1
                                break
                            }
                        }
                        if(sd ==0){
                            let data3 = {
                                month:this.formatDate2(response.data.data.listFromPage[i].publishDatetime),
                                slogList:[response.data.data.listFromPage[i]]
                            }
                            this.timeline.push(data3)
                        }
                        
                    }
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
        //     this.loading = false
        // },1200)
        let data = ({
            page:0,
            schoolId:window.sessionStorage.getItem('schoolId')
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/mySlogList',data).then((response)=>{
            if(response.data.code == '201'){
                this.loading = false
                for(var i = 0;i<response.data.data.listFromPage.length;i++){
                    // this.timeline.push(response.data.data.timeline[i])
                    if(this.timeline.length == 0){
                        // this.timeline.push(this.formatDate2(response.data.data.timeline[i].publishDatetime))
                        let data = {
                            month:this.formatDate2(response.data.data.listFromPage[i].publishDatetime),
                            slogList:[response.data.data.listFromPage[i]]
                        }
                        this.timeline.push(data)
                    }else{
                        let sd = 0
                        for(var j = 0;j<this.timeline.length;j++){
                            if(this.formatDate2(response.data.data.listFromPage[i].publishDatetime) == this.timeline[j].month){
                                this.timeline[j].slogList.push(response.data.data.listFromPage[i])
                                sd = 1
                                break
                            }
                        }
                        if(sd ==0){
                            let data3 = {
                                month:this.formatDate2(response.data.data.listFromPage[i].publishDatetime),
                                slogList:[response.data.data.listFromPage[i]]
                            }
                            this.timeline.push(data3)
                        }
                        
                    }
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
}

</script>

<style scoped>

::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #29E6D3;
    background: #29E6D3;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #29E6D3 !important;
}
</style>