<template>
  <div data-v-8f4c44c2 class="newsNew">
      <div data-v-8f4c44c2 class="news-center-filter">
          <div data-v-8f4c44c2 class="z-segment is-round" style="font-weight: bold;">
            <div class="z-segment-item first">留言</div>
          </div>
          <div data-v-8f4c44c2 class="z-segment is-round zxc" style="font-weight: bold;background-color: #29E6D3;color:aliceblue">
            
            <!-- <div class="z-segment-item first " ><el-button type="text" @click="dialogFormVisible = true" circle><i class="el-icon-plus"></i></el-button></div> -->
            <el-tooltip class="item" effect="light" content="发布留言" placement="right">
                <el-button type="success" @click="dialogFormVisible = true" style="background-color: #29E6D3;border-color:#29E6D3" circle><i class="el-icon-plus"></i></el-button>
            </el-tooltip>
            
            <el-dialog title="请输入留言" :visible.sync="dialogFormVisible" class="my-info-dialog">
                <el-form :model="form">
                    <el-input type="textarea" :rows="10" v-model="form.name" autocomplete="off" style="width:80%;margin-left: 10%;"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;cancel()">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false;confirm()">确 定</el-button>
                </div>
            </el-dialog>
          </div>
         
      </div>
      <div data-v-8f4c44c2 element-loading-background="rgba(0, 0, 0, 0)" class="newsNew-main-content">
          <div data-v-5773a1c6 data-v-8f4c44c2 class="child-news">
              <div data-v-5773a1c6 class="child-news-main">
                  <el-card class="box-card" style="width:100%">
                    <ul class="ly-list">
                        <li v-for="(item,index) in messageList" :key="index">
                            <dl>
                                <dt>
                                    <section>
                                        <i class="el-icon-chat-line-round"></i>
                                    </section>
                                </dt>
                                <dd>
                                    <div class="ly-text">
                                        <h3>{{item.authorId}}留言：</h3>
                                        <pre style="background-color: rgb(255, 255, 255); border: 0px; font-family: 微软雅黑; color: rgb(89, 89, 90); font-size: 14px; padding: 0px; margin: 0px; white-space: pre-wrap; overflow-wrap: break-word;">{{item.content}}
                                        </pre>
                                        <div class="date">{{formatDate(item.commentDatetime)}}</div>
                                    </div>
                                </dd>
                            </dl>
                        </li>
                        
                    </ul>
                    <!-- <el-pagination
                        layout="prev, pager, next"
                        :total="50" style="margin-left: 36%;float: left;">
                    </el-pagination> -->
                    <el-pagination
                        layout="total,prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-size="page.size"
                        :pager-count="7"
                        :page-count="page.totalPage"
                        style="margin-left: 36%;float: left;">
                    </el-pagination>
                  </el-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            messageList:[
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'},
                // {author:'魏辰旭',content:'近期送入学校的外卖丢失现象十分严重。由于仍有相当一部分的外卖可以通过栅栏送至学校，仅凭宿舍楼、学院楼门口的桌子柜子不可能实现无接触配送，以防疫为名头显然是站不住脚的。因此我提议校内配送同样取消无接触配送，并强制要求骑手将外卖送至学生手上，以确保学生权益，并预防将来可能发生的舆论问题',date:'2022-05-22 12:34:22'}
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
            page:{
            currentPage:null,
            size: null,
            totalPage:null
            },
        }
    },
    methods: {
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
      cancel(){
          this.$message({
              message:'您已取消输入',
              type:'info'
          })
      },
      confirm(){
          let data = ({
                schoolId:window.sessionStorage.getItem('schoolId'),
                content:this.form.name
            })
            // if(data.content == ''){
            //     this.$message.error({
            //         message:'输入内容不能为空！'
            //     })
            //     return
            // }
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
      handleCurrentChange(val) {
            this.page.currentPage = val;
            let data = {
            page:(this.page.currentPage-1)*this.page.size
            }
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/comment/list',data).then((response)=>{
                if(response.data.code == '201'){
                    this.messageList.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.messageList.push(response.data.data.listFromPage[i])
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
    created(){
        let data = {
            page:0
        }
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/comment/list',data).then((response)=>{
            if(response.data.code == '201'){
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.messageList.push(response.data.data.listFromPage[i])
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
}

</script>
<style>
/* .zxc :hover{
    background-color: #29E6D3;
} */
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
    background: rgba(213, 234, 240, 0.96);
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
.ly-list li {
    border-bottom: 1px #f5f5f5 solid;
    padding-bottom: 30px;
    margin-bottom: 30px;
    float: left;
    width: 100%;
}
dl {
    margin-top: 0;
    margin-bottom: 20px;
}
.ly-list li dt {
    float: left;
    width: 65px;
    margin-right: 20px;
}
.ly-list li dt section {
    width: 100%;
    height: 35px;
    padding-top: 13px;
    background: #29E6D3;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    margin-top:10px;
}
.ly-list li dd {
    float: left;
    width: 80%;
    font-size: 14px;
}
.ly-list li dd .ly-text {
    position: relative;
}
.ly-list li dd div.date {
    font-size: 12px;
    color: #999;
    line-height: 45px;
}
.ly-list li{
    list-style: none;
}
.zxc{
    background-color: #29E6D3
}
.my-info-dialog .el-dialog {
    width:30%;
    border:2px solid #29E6D3;
    border-radius:10px;
}
</style>