<template>
  <div data-v-8f4c44c2 class="newsNew">
      <div data-v-8f4c44c2 class="news-center-filter">
          <div data-v-8f4c44c2 class="z-segment is-round" style="font-weight: bold;">
            <div class="z-segment-item first">技术分享</div>
          </div>

          <div data-v-8f4c44c2 class="z-segment is-round zxc" style="font-weight: bold;background-color: #29E6D3;color:aliceblue">
            
            <!-- <div class="z-segment-item first " ><el-button type="text" @click="dialogFormVisible = true" circle><i class="el-icon-plus"></i></el-button></div> -->
            <el-tooltip class="item" effect="light" content="发布题解/博客" placement="right">
                <el-button type="success" @click="toAdd" style="background-color: #29E6D3;border-color:#29E6D3" circle><i class="el-icon-plus"></i></el-button>
            </el-tooltip>
          </div>
         
      </div>
      <div data-v-8f4c44c2 element-loading-background="rgba(0, 0, 0, 0)" class="newsNew-main-content">
          <div data-v-5773a1c6 data-v-8f4c44c2 class="child-news">
              <div data-v-5773a1c6 class="child-news-main">
                  <div data-v-5773a1c6 element-loading-background="rgba(0, 0, 0, 0)" class="child-news-main-content" style="width:100%" v-loading="loading">
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
                                <el-tag type="info" v-for="(item2,index) in item.tagNameList" :key="index" style="margin-left:5px">{{item2}}</el-tag>
                                <div style="float:right" class="qqq" @click="toDetail(item)">原文</div>
                            </div>
                           
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="2"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-left:10px"></el-avatar></el-col>
                            <el-col :span="9">
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
                        <hr style="margin: 10px 0 10px 0;">
                        <div class="btn-group btn-group-justified" style="padding-bottom: 5px;">
                            <div class="btn-group">
                                <span style="padding-top:5px"><i :class="changeCss(item)" @click="good1(item,item.id)" :id="item.id">赞 {{item.goodCount}}</i></span>
                            </div>
                            <div class="btn-group">
                                <span style="padding-top:5px"><i class="el-icon-chat-square">评论 {{item.commentCount}}</i></span>
                            </div>
                        </div>
                        <hr style="margin: 10px 0 0 0;">
                    </el-card>
                    
                    <!-- <el-pagination
                        layout="prev, pager, next"
                        :total="50" style="text-align:center;margin-top: 7px;background-color: rgba(255, 255, 255, 0.96)">
                    </el-pagination> -->
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
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'NewsListContent',
    data(){
        return{
            newsList:[
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'}   
            ],
            slogList:[
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找'],chat:'22',title:'如何优化排序算法效率',problemId:'',problemTitle:'',problemLink:'',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'如何优化排序算法效率',problemId:'',problemTitle:'',problemLink:'',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'如何优化排序算法效率',problemId:'',problemTitle:'',problemLink:'',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'},
                // {good:'33',tagList:['二分查找','排序'],chat:'22',title:'',problemId:'P01200',problemTitle:'二分查找',problemLink:'https://leetcode.cn/problems/binary-search',slogAuthor:'魏辰旭',slogdate:'2022-5-31',content:'AcWing《SpringBoot框架课》拼团优惠！https://www.acwing.com/activity/content/introduction/1877/group_buy/69225/'}
            ],
            // tagList:['二分查找','排序'],
            page:{
            currentPage:null,
            size: null,
            totalPage:null
            },
            item:{},
            loading:false
        }
    },
    methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        changeCss(val){
            if(val.isGood == 0){
                return "el-icon-star-on"
            }else{
                return "el-icon-star-on sdf"
            }
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
        toDetail(item){
            
            this.$router.push({path:'/slogdetail'});
            // console.log(123)
            this.item = item
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
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/good',data).then((response)=>{
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
        toAdd(){
            this.$router.push({path:'/addslog'});
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
            this.loading = true
            this.page.currentPage = val;
            let data = {
            page:(this.page.currentPage-1)*this.page.size,
            userId:window.sessionStorage.getItem('schoolId')
            }
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/slogList',data).then((response)=>{
                if(response.data.code == '201'){
                    this.loading = false
                    this.slogList.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.slogList.push(response.data.data.listFromPage[i])
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
    computed:{
        
    },
    created(){
        this.loading = true
        // setTimeout(()=>{
        //     this.loading = false
        // },1200)
        let data = {
            page:0,
            userId:window.sessionStorage.getItem('schoolId')
        }
        console.log(data)
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/slog/slogList',data).then((response)=>{
            if(response.data.code == '201'){
                this.loading = false
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.slogList.push(response.data.data.listFromPage[i])
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
    //一定要在beforeDestroy的时候把数据传出去不然第一次页面2无法接受到
    beforeDestroy(){
        this.$bus.$emit('detail',this.item)
    }
}

</script>
<style scoped>
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


</style>