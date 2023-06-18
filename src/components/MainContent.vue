<template>
<div class="css-env23c-ContentWrapper" id="lc-content">
    <div class="css-10bg4ua-ContainerWrapper">
      <div class="css-1o1owh5-Container">
          <div class="css-185cq5e-LeftContainer">
              <div class="css-iqp4w9-TopicContainer">
                  <el-card class="box-card qwe" shadow="always">
                    <div slot="header" class="clearfix" style="font-size:large">
                        <span><strong>公告</strong></span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="css-1pej3s6-FeedContainer e1hv7dii0" v-for="(item,index) of noticeList" :key="index">
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
                            发布时间：{{formatDate(item.publishDatetime)}}
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
                  </el-card>
              </div>
              <!-- <div class="css-1x51ztl-AdsContainer"></div>   -->
              <div class="css-iqp4w9-TopicContainer" style="margin-top:20px">
                  <el-card class="box-card qwe2">
                    <div slot="header" class="clearfix" style="font-size:large">
                        <span><strong>新闻/活动</strong></span>
                        <el-button style="float: right; padding: 3px 0;color: #29E6D3;" type="text" @click="toNewsList">查看更多<i class="el-icon-arrow-right"></i></el-button>
                    </div>
                    <div class="css-1pej3s6-FeedContainer e1hv7dii0" v-for="(item,index) of newsList" :key="index">
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
                            发布时间：{{formatDate(item.publishDatetime)}}
                        </div>
                        </div>
                        <div class="css-1vwizfm-Divider"></div>
                    </div>
                  </el-card>
              </div>
          </div>
      </div>
  </div>
</div>
  
</template>

<script>
export default {
    name:'MainContent',
    data(){
        return{
            noticeList:[
            // {title:'关于清理友谊校区自行车车棚内杂物的通知' , content:'你有病吧',author:'离退休党委',datetime:'2022-05-27'},
            // {title:'关于催促办理教职工周转公寓租赁协议签订等相关工作的通知' , content:'你没事吧',author:'国有资产管理处',datetime:'2021-5-28'},
            // {title:'关于开展2021-2022学年春季学期主讲教师资格认证的通知' , content:'你傻呗吧',author:'教学研究与教师发展中心',datetime:'2021-2-5'},
            // {title:'倡议书' , content:'哎哎哎哎哎',author:'后勤产业集团',datetime:'2021-5-26'},
            // {title:'关于做好2022年职称评审预申报工作的通知' , content:'少时诵诗书所所所所',author:'人事处',datetime:'2021-5-29'}
            ],
            newsList:[
            // {title:'关于清理友谊校区自行车车棚内杂物的通知' , content:'你有病吧',author:'离退休党委',datetime:'2022-05-27'},
            // {title:'关于催促办理教职工周转公寓租赁协议签订等相关工作的通知' , content:'你没事吧',author:'国有资产管理处',datetime:'2021-5-28'},
            // {title:'关于开展2021-2022学年春季学期主讲教师资格认证的通知' , content:'你傻呗吧',author:'教学研究与教师发展中心',datetime:'2021-2-5'},
            // {title:'倡议书' , content:'哎哎哎哎哎',author:'后勤产业集团',datetime:'2021-5-26'},
            // {title:'关于做好2022年职称评审预申报工作的通知' , content:'少时诵诗书所所所所',author:'人事处',datetime:'2021-5-29'},
            // {title:'关于清理友谊校区自行车车棚内杂物的通知' , content:'你有病吧',author:'离退休党委',datetime:'2022-05-27'},
            // {title:'关于催促办理教职工周转公寓租赁协议签订等相关工作的通知' , content:'你没事吧',author:'国有资产管理处',datetime:'2021-5-28'},
            // {title:'关于开展2021-2022学年春季学期主讲教师资格认证的通知' , content:'你傻呗吧',author:'教学研究与教师发展中心',datetime:'2021-2-5'},
            // {title:'倡议书' , content:'哎哎哎哎哎',author:'后勤产业集团',datetime:'2021-5-26'},
            // {title:'关于做好2022年职称评审预申报工作的通知' , content:'少时诵诗书所所所所',author:'人事处',datetime:'2021-5-29'}
            ],
            page:{
                currentPage:null,
                size:null,
                totalPage:null
            },
            item:{}
        }
        
    },
    methods:{
        // formatDate(val, pattern) {
        //     if (!val) {
        //     return null;
        // }
        //     if (!pattern) {
        //         pattern = "yyyy-MM-dd hh:mm:ss"
        // }
        //     return new Date(val).format(pattern);
        // },
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        toNewsList(){
        this.$router.push({path:'/newslist'})
      },
        toNewsDetail(item){
            this.$router.push({path:'/newsdetail'})
            this.item = item
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            let data = ({
            page:(this.page.currentPage - 1)*this.page.size
            })
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/announcementList',data).then((response)=>{
                if(response.data.code == '201'){
                    this.noticeList.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.noticeList.push(response.data.data.listFromPage[i])
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
    },
    created(){
        let data = ({
            page:0
        })
        let data2 = ({
            page:0
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/announcementList',data).then((response)=>{
            if(response.data.code == '201'){
                for(var i=0;i<response.data.data.listFromPage.length;i++){ 
                    this.noticeList.push(response.data.data.listFromPage[i])
                }
                this.page.currentPage = response.data.data.current
                this.page.size = response.data.data.size
                this.page.totalPage = response.data.data.totalPage
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        }),
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/newsList',data2).then((response)=>{
            if(response.data.code == '201'){
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.newsList.push(response.data.data.listFromPage[i])
                }
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        })
    },
    beforeDestroy(){
        this.$bus.$emit('newsDetail',this.item)
    }
}

</script>
<style scoped>
#lc-content {
    padding-left: calc(100vw - 100%);
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 900px;
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
    width: 888px;
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
    max-width: 250px;
}
.css-1pej3s6-FeedContainer {
    padding: 6px 0px;
}

.noticeright{
    justify-content: flex-end;
    text-align: right;
}

.el-card{
    /* border:2px solid #29E6D3; */
    border-radius: 7px;
}
.el-card:hover{
    border:1px solid #29E6D3;
}
.el-card ::v-deep .el-card__header {
  padding: 10px 25px;
}

.el-card ::v-deep .el-card__body {
  padding-top: 5px,10px,5px,10px;
}
</style>