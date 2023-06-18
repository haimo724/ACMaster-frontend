<template>
  <div class="news-new-detail">
      <!-- <div element-loading-background="rgba(0, 0, 0, 0)" class="news-new-detail-left" style="width:100%"> -->
        <el-card class="box-card" shadow="always" style="margin-bottom:20px" v-loading="loading">
        <div class="news-new-detail-left-title" style="height:40px">
            <div style="float:left">
                <span>标题:{{slogDetail.title}}</span>
                <span v-show="isShow(slogDetail.correspondingId)">来源Id:{{slogDetail.correspondingId}}</span>&nbsp;
                <span v-show="isShow(slogDetail.correspondingTitle)">来源题目{{slogDetail.correspondingTitle}}</span>&nbsp;
                <a :href="slogDetail.correspondingLink" style="text-decoration:none;color:#29E6D3" v-show="isShow(slogDetail.correspondingLink)">题目链接</a>
            </div>
            <!-- <div class="tag" v-for="(item,index) in slogDetail.tagList" :key="index">{{item}}</div> -->
            <div style="float:right;vertical-align: top;height:40px">
                <el-tag type="info" v-for="(item2,index) in slogDetail.tagNameList" :key="index" style="margin-left:5px;margin-bottom: 10px">{{item2}}</el-tag>
            </div>
             
        </div>
        <div class="news-new-detail-left-subTitle">
            <div class="news-new-detail-left-subTitle-left" style="vertical-align:center">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="float:left;margin-left:10px;width:30px;height: 30px;"></el-avatar>
                <!-- <span style="margin-left:5px;margin-right:5px">|</span> -->
                <div style="float:left;vertical-align: middle;margin-top: 10px;"><span>发布者：{{slogDetail.author}}</span></div>
                <div style="float:left;vertical-align: middle;margin-top: 10px;margin-left: 4px;margin-right: 4px;"><span>|</span></div>
                <div style="float:left;vertical-align: middle;margin-top: 10px;"><span>{{formatDate(slogDetail.publishDatetime)}}</span></div>
            </div>
            <!-- <span class="collection">
                <i class="el-icon-star-on" id="good1" @click="good1"></i>
            </span> -->
        </div>
        <div class="news-new-detail-left-content keep-hue">
            <p class="markdown-body" style="margin-top: 5px; margin-bottom: 5px; text-indent: 2em;" v-html="slogDetail.content">
                <!-- {{slogDetail.content}}<br> -->
            </p>
        </div>
        </el-card>

        <br>
        <div style="margin-bottom:10px;font-size:large;height:40px">
            <span><strong>评论</strong></span>
            <el-tooltip class="item" effect="light" content="发表评论" placement="right">
                <el-button type="success" @click="dialogFormVisible = true" icon="el-icon-plus" circle style="float:right;background-color: #29E6D3;border:0"></el-button>
            </el-tooltip>

            <el-dialog title="请输入评论" :visible.sync="dialogFormVisible" class="my-info-dialog">
                <el-form :model="form">
                    <el-input type="textarea" :rows="10" v-model="form.name" autocomplete="off" style="width:80%;margin-left: 10%;"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;cancel()">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false;confirm()">确 定</el-button>
                </div>
            </el-dialog>
           
        </div>
        <el-card class="box-card sss" v-for="(item,index) in commentList" :key="index">
            <div class="news-new-detail-left-subTitle" style="margin-top:5px">
            <div class="news-new-detail-left-subTitle-left" style="vertical-align:center">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="float:left;margin-left:10px;width:30px;height: 30px;"></el-avatar>
                <!-- <span style="margin-left:5px;margin-right:5px">|</span> -->
                <div style="float:left;vertical-align: middle;margin-top: 10px;"><span>发布者：{{item.authorId}}</span></div>
                <div style="float:left;vertical-align: middle;margin-top: 10px;margin-left: 4px;margin-right: 4px;"><span>|</span></div>
                <div style="float:left;vertical-align: middle;margin-top: 10px;"><span>{{formatDate(item.commentDatetime)}}</span></div>
            </div>
            <!-- <span class="collection">
                <i class="el-icon-star-on" id="good1" @click="good1"></i>
            </span> -->
            </div>
            <div class="news-new-detail-left-content keep-hue" style="margin-top:10px;padding-bottom:5px">
            <div  style="margin-top: 5px; margin-bottom: 5px" v-html="item.content">
                <!-- {{item.content}} -->
            </div>
        </div>
        </el-card>
        <el-pagination
            layout="total,prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.size"
            :pager-count="7"
            :page-count="page.totalPage"
            style="text-align:center;margin-top: 7px;background-color: rgba(255, 255, 255, 0.96)">
        </el-pagination>

      </div>
</template>

<script>
import "mavon-editor/dist/css/index.css"
export default {
    data(){
        return{
            commentList:[
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'},
                // {author:'魏辰旭',date:'2022-5-31',content:'怎么才能改变呢'}
            ],
            dialogFormVisible: false,
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            formLabelWidth: '120px',
            slogId:'',
            loading:false,
            slogDetail:{
                // id:'',
                // title:'',
                // author:'',
                // date:'',
                // coId:'',
                // coTitle:'',
                // coLink:'',
                // content:'',
                // tagList:[]
            },
            page:{
            currentPage:null,
            size: null,
            totalPage:null
            },
            tagList:['二分查找','排序'],
            sdf:'<h2><a id="12_0"></a>12</h2> <p><span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mi>z</mi></mrow><annotation encoding="application/x-tex">x+y=z </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.58333em;"></span><span class="strut bottom" style="height:0.7777700000000001em;vertical-align:-0.19444em;"></span><span class="base"><span class="mord mathit">x</span><span class="mbin">+</span><span class="mord mathit" style="margin-right:0.03588em;">y</span><span class="mrel">=</span><span class="mord mathit" style="margin-right:0.04398em;">z</span></span></span></span></span></p>'
        }
    },
    methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        good1(){
            let good = document.getElementById("good1");
            if(good.className=="el-icon-star-on"){
                good.className = "el-icon-star-on sdf"
            }else{
                good.className = "el-icon-star-on"
            }
            // this.slogDetail.author = this.data.slogAuthor
        },
        cancel(){
          this.$message({
              message:'您已取消输入',
              type:'info'
          })
        },
        confirm(){
            let data = ({
                originId:this.slogId,
                schoolId:window.sessionStorage.getItem('schoolId'),
                content:this.form.name
            })
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/comment/postComment',data).then((response)=>{
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
        isShow(re){
        //    let sd = document.getElementById('href');
        //    let re = sd.attributes['href'];
            if(re=='null'||re==""||re ==null){
                return false;
            }else{
                return true;
            }
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            let data = ({
            page:(this.page.currentPage-1)*this.page.size,
            originId:this.slogId
            })
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/comment/list',data).then((response)=>{
                if(response.data.code == '201'){
                    this.commentList.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.commentList.push(response.data.data.listFromPage[i])
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
    beforeCreate() {
        this.$bus.$on('detail',(data)=>{
            console.log('我是School组件，收到了数据',data);
            this.$bus.asd = data;
        })
    },
    created(){
        // let data = ({
        //     page:(this.page.currentPage-1)*this.page.size,
        //     originId:this.slogId
        // })
        // this.$axios.post('http://127.0.0.1:9090/comment/list',data).then((response)=>{
        //     if(response.data.code == '201'){
        //         for(var i=0;i<response.data.data.listFromPage.length;i++){
        //             this.commentList.push(response.data.data.listFromPage[i])
        //         }
        //         this.page.currentPage = response.data.data.current
        //         this.page.size = response.data.data.size
        //         this.page.totalPage = response.data.data.totalPage
        //     }else{
        //         this.$message.error({
        //             message:response.data.message
        //         })
        //     }
        // })
    },
    //一定要在mounted时候把数据渲染到页面上
    mounted(){
        if(this.$bus.asd!= undefined){
            // this.slogDetail.title = this.$bus.asd.title;
            // this.slogDetail.author = this.$bus.asd.authorId;
            // this.slogDetail.date = this.$bus.asd.publishDatetime;
            // this.slogDetail.coId = this.$bus.asd.correspondingId;
            // this.slogDetail.coTitle = this.$bus.asd.correspondingTitle  ;
            // this.slogDetail.coLink = this.$bus.asd.correspondingLink;
            // this.slogDetail.content = this.$bus.asd.content;
            this.slogId = this.$bus.asd.id;
            window.sessionStorage.removeItem('slogId')
            window.sessionStorage.setItem('slogId',this.slogId)
        }else{
            this.slogId = window.sessionStorage.getItem('slogId')
        }
        this.loading = true
        let data = ({
            id:this.slogId,
            userId:window.sessionStorage.getItem('schoolId')
        })
        console.log(data)
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/slogDetails',data).then((response)=>{
            if(response.data.code=='201'){
                this.loading = false
                this.slogDetail = response.data.data
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        })

        let data2 = ({
            page:0,
            originId:this.slogId
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/comment/list',data2).then((response)=>{
            if(response.data.code == '201'){
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.commentList.push(response.data.data.listFromPage[i])
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
        
        // this.slogDetail.tagList = this.$bus.asd.tagList;

    }
    // destroyed(){
    //     this.$bus.$off('detail')
    // }
    // beforeDestroy() {
    //     this.$bus.$off('detail')
    // }
}

</script>
<style>
.tag{
    height:40px;
    text-align: center;
    float:left;
    font-size: small;
    margin-left: 7px;
    padding: 0px 7px;
    border:1px solid #dddee1;
    border-radius:32px;
    font-weight: initial;
}
.qwer{
    float:right;
    border:1px solid;
    /* border-radius: 20%; */
    width:100px;
    text-align: center;
}
.qwer :hover{
    background-color:aquamarine
}
.sdf{
    color:red;
}
.sss ::v-deep .el-card__body {
  padding: 10px 25px;
}
.news-new-detail {
    width: 60%!important;
    padding-left: 2%!important;
    padding-right: 2%!important;
}
.news-new-detail {
    box-sizing: border-box;
    margin: 20px auto 50px;
    width: 1680px;
    min-width: 760px;
}
.news-new-detail-left {
    width: 75%;
    background-color: #fff;
    border-radius: 6px;
    padding: 40px 50px 20px;
}
.news-new-detail-left-title {
    color: #333;
    font-size: 30px;
    line-height: 40px;
    font-weight: 600;
    text-align: left;
}
.news-new-detail-left-subTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e6e6e6;
}
.news-new-detail-left-content {
    margin-top: 25px;
    max-width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-line;
    color: #333;
    font-size: 16px;
    line-height: 38px;
    padding-bottom: 30px;
    overflow-wrap: break-word;
}
.news-new-detail-left-subTitle-left {
    color: #666;
    font-size: 16px;
    padding: 1px 0;
    position: relative;
    flex: 1;
    line-height: 14px;
    vertical-align:top;
}
.news-new-detail-left-subTitle .collection.is-noC {
    color: #666;
}
.news-new-detail-left-subTitle .collection {
    color: #666;
    font-size: 25px;
}
.sw-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    fill: currentColor;
    vertical-align: -0.15em;
}
.keep-hue {
    filter: var(--color-filter,hue-rotate(0deg));
}

.el-tooltip, .sw-icon {
    box-sizing: content-box;
}
.my-info-dialog .el-dialog {
    width:30%;
    border:2px solid #29E6D3;
    border-radius:10px;
}

</style>