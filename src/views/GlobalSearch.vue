<template>
  <div>
    <back-top></back-top>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <div style="padding-top:30px;padding-left: 15%;padding-right:15%;" >
        <el-tabs type="border-card" style="" v-model="activeName" v-loading="loading">
        <!-- <el-tab-pane  name="first">
            <span slot="label">
                新闻/活动/公告<el-badge :value="value1"></el-badge>
            </span>
            <div class="css-1pej3s6-FeedContainer e1hv7dii0"  v-for="(item,index) of noticeList" :key="index">
                <div class="noticeheader">
                <div class="mainheader" @click="toNewsDetail(item)">
                    {{item.title}}
                </div>
            </div>
            <a style="text-decoration:none;color: #303133">
                <div class="summary">
                    {{item.articleAbstract}}
                </div>
            </a>
            <div class="tags">
                <div class="css-1pimfdd-text-Tag e1hv7dii14">
                    发布者：{{item.authorId}}
                </div>
                <div class="noticeright css-1pimfdd-text-Tag">
                    发布时间：{{item.publishDatetime}}
                </div>
                </div>
                <div class="css-1vwizfm-Divider"></div>
            </div>
            <el-pagination
                layout="total,prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-size="page.size"
                :pager-count="7"
                :page-count="page.totalPage"
                style="text-align:center">
            </el-pagination>
        </el-tab-pane> -->
        <el-tab-pane name="second">
            <span slot="label">
                技术分享<el-badge :value="value2"></el-badge>
            </span>
            <el-card class="box-card" style="margin-bottom:10px" v-for="(item,index) in slogList" :key="index">
                <div slot="header" class="headerter">
                    <div class="header-left">
                        <div style="float:left">
                            <span>标题:{{item.title}}</span>&nbsp;
                            <span v-show="isShow(item.correspondingId)">来源Id:{{item.correspondingId}}</span>&nbsp;
                            <span v-show="isShow(item.correspondingTitle)">来源题目:{{item.correspondingTitle}}</span>&nbsp;
                            <a style="text-decoration:none;color:#29E6D3" v-show="isShow(item.correspondingId)" id="href" @click="Jump(item)">题目链接</a>
                        </div>
                            
                        <!-- <div class="tag" v-for="(item2,index) in tagList" :key="index">{{item2}}</div> -->
                        <!-- <el-tag type="info" v-for="(item2,index) in item.tagList" :key="index" style="margin-left:5px">{{item2}}</el-tag> -->
                        <div style="float:right" class="qqq" @click="toDetail(item)">原文</div>
                    </div>
                    
                </div>
                <el-row :gutter="20">
                    <el-col :span="2"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-left:10px"></el-avatar></el-col>
                    <el-col :span="5">
                        <span><strong>作者:{{item.author}}</strong></span>
                        <br>
                        <span>发布时间:{{formatDate(item.publishDatetime)}}</span>
                    </el-col>
                </el-row>
                <div style="padding-left:70px">
                    <div class="file-content-field">
                        <div class="markdown-body" style="white-space: pre-wrap; word-break: break-all; padding-right: 25px; margin-top: 10px;max-height: 70px;" v-html="item.content">
                        <!-- {{item.content}} -->
                        </div>
                    </div>
                </div>
                <!-- <hr style="margin: 10px 0 10px 0;"> -->
                <!-- <div class="btn-group btn-group-justified" style="padding-bottom: 5px;">
                    <div class="btn-group">
                        <span style="padding-top:5px"><i class="el-icon-star-on" @click="good1(item,item.id)" :id="item.id">赞 {{item.goodNumber}}</i></span>
                    </div>
                    <div class="btn-group">
                        <span style="padding-top:5px"><i class="el-icon-chat-square">评论 {{item.commentCount}}</i></span>
                    </div>
                </div> -->
                <!-- <hr style="margin: 10px 0 0 0;"> -->
            </el-card>
            <el-pagination
                layout="total,prev, pager, next"
                @current-change="handleCurrentChange2"
                :current-page="page2.currentPage"
                :page-size="page2.size"
                :pager-count="7"
                :page-count="page2.totalPage"
                style="text-align:center;margin-top: 7px;background-color: rgba(255, 255, 255, 0.96)">
            </el-pagination>
        </el-tab-pane>
        <!-- <el-tab-pane name="third">
            <span slot="label">
                题目<el-badge :value="value3"></el-badge>
            </span>
            <el-table
                v-if="activeName == 'third'"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="shown_id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="题目名称">
                    <template slot-scope="scope">
                            <a @click="toDetail2(scope.row)" class="light">{{scope.row.title}}</a>
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
                    prop="total_submission"
                    label="提交总数">
                </el-table-column>
                <el-table-column
                    prop="pass_rate"
                    label="通过率">
                </el-table-column>
                <el-table-column
                    prop="tags"
                    label="标签"
                    width="300px">
                    <template slot-scope="scope">
                        <el-tag type="info" v-for="(item,index) in scope.row.tags" :key="index" style="margin-right:5px;margin-top:5px">{{item.tag_name}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="total,prev, pager, next"
                @current-change="handleCurrentChange3"
                :current-page="page3.currentPage"
                :page-size="page3.size"
                :pager-count="7"
                :page-count="page3.totalPage"
                style="text-align:center;margin-top: 7px;background-color: rgba(255, 255, 255, 0.96)">
            </el-pagination>
        </el-tab-pane> -->
        </el-tabs>
    </div>
    <big-footer></big-footer>
    
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
export default {
  name:'Main-asa',
  components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    },
   data(){
    return{
        activeName:'second',
        loading:false,
        searchContent:'',
        // page:{
        //     currentPage:1,
        //     size:10,
        //     totalPage:1
        // },
        page2:{
            currentPage:1,
            size:10,
            totalPage:1
        },

        // page3:{
        //     currentPage:1,
        //     size:10,
        //     totalPage:1
        // },
        // noticeList:[],
        slogList:[],
        // tableData:[],
        item:'',
        item2:'',
        value1:0,
        value2:0,
        value3:0
    }
   },
   methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        Jump(val){
            if(val.correspondingLink == ''){
                window.sessionStorage.removeItem('problemId')
                window.sessionStorage.setItem('problemId',val.correspondingId)
                 this.$router.push({path:'/problemdetail'})
            }else{
                window.location.href=val.correspondingLink
            }
        },
        // toNewsList(){
        //     this.$router.push({path:'/newslist'})
        // },
        // toNewsDetail(item){
        //     this.$router.push({path:'/newsdetail'})
        //     this.item = item
        // },
        // toDetail2(val){
        //     window.sessionStorage.removeItem('problemId')
        //     window.sessionStorage.setItem('problemId',val.id)
        //     this.$router.push({path:'/problemdetail'})
        // },
        // changeCss(val){
        //     if(val == 1){
        //         return "easy"
        //     }else if(val == 2){
        //         return "medium"
        //     }else{
        //         return "hard"
        //     }
        // },
        // handleCurrentChange(val) {
        //     this.page.currentPage = val;
        //     let data = ({
        //         page1:(this.page.currentPage-1)*this.page.size,
        //         page2:(this.page2.currentPage-1)*this.page2.size,
        //         page3:(this.page3.currentPage-1)*this.page3.size,
        //         content:this.searchContent
        //     })
        //     this.$axios.post('http://127.0.0.1:9090/globalsearch',data).then((response)=>{
        //         if(response.data.code == '201'){
        //             this.noticeList.length = 0
        //             for(var i=0;i<response.data.data.Article.article.length;i++){ 
        //                 this.noticeList.push(response.data.data.Article.article[i])
        //             }
        //             this.page.currentPage = response.data.data.Slog.current
        //             this.page.size = response.data.data.Slog.size
        //             this.page.totalPage = response.data.data.Slog.totalPage
        //         }else{
        //             this.$message.error({
        //                 message:response.data.message
        //             })
        //         }
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        // },
        toDetail(item){
            
            this.$router.push({path:'/slogdetail'});
            // console.log(123)
            this.item2 = item
        },
        good1(item,slogId){
            let data
            let good = document.getElementById(slogId);
            if(good.className=="el-icon-star-on"){
                good.className = "el-icon-star-on sdf"
                item.goodCount ++;
                data = {
                    isAdd :1,
                    slogId :slogId,
                    userId:window.sessionStorage.getItem('schoolId')
                }
            }else{
                good.className = "el-icon-star-on"
                item.goodCount --;
                data = {
                    isAdd :0,
                    slogId :slogId,
                    userId:window.sessionStorage.getItem('schoolId')
                }
            }
            this.$axios.post('http://127.0.0.1:9090/slog/good',data).then((response)=>{
                if(response.data.code == '201'){
                    this.$message({
                        message:response.data.message,
                        type:'success'
                    })
                    // item.goodCount = response.data.data.listFromPage[index].goodCount
                }else{
                    this.$message.error({
                    message:response.data.message
                })
            }
            }).catch((error)=>{
                console.log(error)
            })
        },
        isShow(re){
        //    let sd = document.getElementById('href');
        //    let re = sd.attributes['href'];
            if(re=='null'||re==""||re ==null){
                return false;
            }else{
                return true;
            }
        },
        handleCurrentChange2(val) {
            this.loading = true
            // setTimeout(()=>{
            //     this.loading = false
            // },1000)
            this.page2.currentPage = val;
            let data = ({
                page:this.page2.currentPage,
                key:this.searchContent
            })
            this.$axios.get('http://127.0.0.1:9090/esslog/search?page='+data.page+'&key='+data.key).then((response)=>{
                // if(response.data.code == '201'){
                //     this.slogList.length = 0
                //     for(var j=0;j<response.data.data.Slog.SlogList.length;j++){
                //         this.slogList.push(response.data.data.Slog.SlogList[j])
                //     }
                //     this.page2.currentPage = response.data.data.Article.current
                //     this.page2.size = response.data.data.Article.size
                //     this.page2.totalPage = response.data.data.Article.totalPage
                // }else{
                //     this.$message.error({
                //         message:response.data.message
                //     })
                // }
                if(response.data.code == 201){
                this.loading = false
                this.slogList.length = 0
                for(var i = 0;i<response.data.data.content.length;i++){
                    this.slogList.push(response.data.data.content[i])
                }
                // this.page2.currentPage = response.data.data.pageable.pageNumber
                this.page2.size = response.data.data.pageable.pageSize
                this.page2.totalPage = response.data.data.totalPages
                this.value2 = response.data.data.totalElements
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
            }).catch((error)=>{
                console.log(error)
            })
        },
        // handleCurrentChange3(val) {
        //     this.page3.currentPage = val;
        //     let data= ({
        //         page1:(this.page.currentPage-1)*this.page.size,
        //         page2:(this.page2.currentPage-1)*this.page2.size,
        //         page3:(this.page3.currentPage-1)*this.page3.size,
        //         content:this.searchContent
        //     })
        //     this.$axios.post('http://127.0.0.1:9090/globalsearch',data).then((response)=>{
        //         if(response.data.code == '201'){
        //             this.tableData.length = 0
        //             for(var t=0;t<response.data.data.Problem.ProblemList.length;t++){
        //                 this.tableData.push(response.data.data.Problem.ProblemList[t])
        //             }
        //             this.page3.currentPage = response.data.data.Problem.current
        //             this.page3.size = response.data.data.Problem.size
        //             this.page3.totalPage = response.data.data.Problem.totalPage
        //         }else{
        //             this.$message.error({
        //                 message:response.data.message
        //             })
        //         }
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
            
        // }
   },
   created(){
        this.loading = true
        // setTimeout(()=>{
        //     this.loading = false
        // },2000)
        this.searchContent = window.sessionStorage.getItem('search')
        let data = {
            page:this.page2.currentPage,
            key:this.searchContent
        }
        console.log(data)
        this.$axios.get('http://127.0.0.1:9090/esslog/search?page='+data.page+'&key='+data.key).then((response)=>{
            // if(response.data.code == '201'){
            //     // for(var i=0;i<response.data.data.Article.article.length;i++){ 
            //     //     this.noticeList.push(response.data.data.Article.article[i])
            //     // }
            //     for(var j=0;j<response.data.data.Slog.SlogList.length;j++){
            //         this.slogList.push(response.data.data.Slog.SlogList[j])
            //     }
            //     // for(var t=0;t<response.data.data.Problem.ProblemList.length;t++){
            //     //     this.tableData.push(response.data.data.Problem.ProblemList[t])
            //     // }
            //     // this.page.currentPage = response.data.data.Slog.current
            //     // this.page.size = response.data.data.Slog.size
            //     // this.page.totalPage = response.data.data.Slog.totalPage
            //     this.page2.currentPage = response.data.data.Article.current
            //     this.page2.size = response.data.data.Article.size
            //     this.page2.totalPage = response.data.data.Article.totalPage
            //     // this.page3.currentPage = response.data.data.Problem.current
            //     // this.page3.size = response.data.data.Problem.size
            //     // this.page3.totalPage = response.data.data.Problem.totalPage
            //     this.value1 = response.data.data.Slog.totalNum
            //     this.value2 = response.data.data.Article.totalNum
            //     this.value3 = response.data.data.Problem.totalNum
            // }else{
            //     this.$message.error({
            //         message:response.data.message
            //     })
            // }
            if(response.data.code == 201){
                this.loading = false
                for(var i = 0;i<response.data.data.content.length;i++){
                this.slogList.push(response.data.data.content[i])
                }
                this.page2.currentPage = response.data.data.pageable.pageNumber
                this.page2.size = response.data.data.pageable.pageSize
                this.page2.totalPage = response.data.data.totalPages
                this.value2 = response.data.data.totalElements
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
   },
   beforeDestroy(){
        this.$bus.$emit('detail',this.item2)
    }
}
</script>
<style>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.css-env23c-ContentWrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    z-index: 0;
}
.css-10bg4ua-ContainerWrapper {
    background: rgba(var(--dsw-layer-bg-rgb), 1);
}
.css-1o1owh5-Container {
    width: 1100px;
    display: flex;
    -webkit-box-pack: center;
    justify-content:center;
    margin: 40px auto 0px;
}
.css-185cq5e-LeftContainer {
    width: 1000px;
}
.css-iqp4w9-TopicContainer {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.css-1x51ztl-AdsContainer {
    margin-top: 10px;
    margin-bottom: 10px;
    width:100%;
    border:1px dashed #bfc0c4;
}
.css-1tc14ag-card-layer1-card-MainContentConainer {
    box-shadow: 0 2px 8px rgba(var(--dsw-black-rgb), 0.08),0 1px 2px rgba(var(--dsw-black-rgb), 0.1);
    background: rgba(var(--dsw-layer-1-rgb), 1);
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 40px;
}
.css-4dtw3k-HeaderContainer {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
}
.css-1vwizfm-Divider {
    width: 100%;
    margin-left: -16px;
    border-top: 1px solid rgb(224, 222, 222);
}
.noticeheader{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.mainheader{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
}
.mainheader:hover{
    color:#29E6D3;
}
.summary{
    font-size: 14px;
    line-height: 20px;
    color: rgba(var(--dsw-label-tertiary-rgba));
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 10px 0px 8px;
    text-decoration: none;
}

.tags{
    display: flex;
    justify-content: space-around;
}
.css-1pimfdd-text-Tag {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(var(--dsw-green-standard-rgb), 1);
    background: rgba(var(--dsw-green-1-rgba));
    height: 24px;
    line-height: 20px;
    padding: 2px 8px;
    border-radius: 12px;
    margin-right: 10px;
    white-space: nowrap;
    max-width: 150px;
}
.css-1pej3s6-FeedContainer {
    padding: 6px 0px;
}

.noticeright{
    justify-content: flex-end;
    text-align: right;
}

.tag{
    float:left;
    font-size: small;
    margin-left: 7px;
    padding: 3px 7px;
    border:1px solid #dddee1;
    border-radius:32px;
    font-weight: initial;
}
.header-left{
    height:27px;
}
.sdf{
    color:red;
}
.headerter{
    font-size: large;
    font-weight:bold;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: black;
}

.qqq:hover{
    color:#29E6D3;
}
.file-content-field {
    max-height: 300px;
    overflow: hidden;
}
hr {
    background: none !important;
    height: 1px !important;
    border: 0 !important;
    border-top: 1px solid #eee !important;
}
.btn-group-justified {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
}
.btn-group-justified .btn-group {
    display: table-cell;
    float: none;
    width: 1%;
}
.btn-group{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.newsNew[data-v-8f4c44c2] {
    width: 60%!important;
    padding-left: 2%!important;
    padding-right: 2%!important;
}
.newsNew[data-v-8f4c44c2] {
    box-sizing: border-box;
    margin: 30px auto 50px;
    width: 1680px;
    width: 760px;
}
.news-center-filter .z-segment {
    height: 40px;
    background-color: transparent;
}
.z-segment.is-round {
    background-color: #666;
    border-radius: 20px;
}
.news-center-filter .z-segment .z-segment-item {
    line-height: 40px;
    background-color: hsla(0,0%,100%,.9);
    color: #333;
}
.news-center-filter .z-segment .z-segment-item {
    font-size: 18px;
    padding: 0 28px;
}
.z-segment {
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    position: relative;
    border-radius: 4px;
    background-color: #f5f7fa;
}
.newsNew .news-center-filter[data-v-8f4c44c2] {
    margin-bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.newsNew .newsNew-main-content[data-v-8f4c44c2] {
    margin-top: 30px;
}
.child-news[data-v-5773a1c6] {
    width: 100%;
}
.child-news-main[data-v-5773a1c6] {
    display: flex;
}
.child-news-main-content[data-v-5773a1c6] {
    background: rgba(255, 255, 255, 0.96);
    width: calc(100% - 454px);
    /* min-height: calc(100vh); */
    border-radius: 6px;
}
.child-news-main-content-list[data-v-5773a1c6] {
    padding-top: 20px;
}
.child-news-main-content-list-item[data-v-5773a1c6] {
    padding: 0 40px;
}
.keep-hue {
    filter: var(--color-filter,hue-rotate(0deg));
}
.news-item[data-v-0c03838e] {
    display: flex;
    border-bottom: 1px solid aliceblue;
    padding: 10px 0;
}
.news-item-right[data-v-0c03838e] {
    width: 100%;
}
.news-item-right.readed-active .news-item-right-title[data-v-0c03838e] {
    color: #666;
}
.news-item-right-title[data-v-0c03838e] {
    max-width: 100%;
    color: #333;
    font-weight: 700;
    font-size: 16px;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
}
.news-item-right-title .title[data-v-0c03838e] {
    color:rgb(15, 187, 199);
    flex: 1;
}
.news-item-right-title .title[data-v-0c03838e] :hover{
    color:rgb(93, 228, 238);
}
.oneRowEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.news-item-right-title .new[data-v-0c03838e] {
    width: 30px;
    height: 16px;
    margin-left: 10px;
}
.news-item-right-title img[data-v-0c03838e] {
    width: 30px;
    height: 16px;
    margin-right: 10px;
}
.news-item-right-desc[data-v-0c03838e] {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 22px;
    max-height: 66px;
}
.threeRowEllipsis {
    -webkit-line-clamp: 3;
}
.content-list-foot[data-v-c24c3b86] {
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
}
.mt10 {
    margin-top: 10px;
}
.mr10 {
    margin-right: 10px;
}
.Ce6e6e6 {
    color: aliceblue;
}
.content-list-foot .releaseDeptName[data-v-c24c3b86] {
    width: calc(100% - 190px);
}
.oneRowEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    color:#29E6D3
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #29E6D3;
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
/* .el-tabs--border-card>.el-tabs__content {
    padding: 15px;
} */
</style>