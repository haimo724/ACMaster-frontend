<template>
  <div class="news-new-detail">
      <!-- <div element-loading-background="rgba(0, 0, 0, 0)" class="news-new-detail-left" style="width:100%"> -->
        <el-card class="box-card" shadow="always" style="width:100%">
        <div class="news-new-detail-left-title">
            {{newsDetail.title}}
        </div>
        <div class="news-new-detail-left-subTitle">
            <div class="news-new-detail-left-subTitle-left">
                <span>发布时间：{{formatDate(newsDetail.publishDatetime)}}</span> 
                <span style="margin-left:5px;margin-right:5px">|</span>
                <span>发布者：{{newsDetail.authorId}}</span>
            </div>
            <!-- <span class="collection">
                <i class="el-icon-star-on" id="good1" @click="good1"></i>
            </span> -->
        </div>
        <div class="news-new-detail-left-content keep-hue">
            <p style="margin-top: 5px; margin-bottom: 5px; text-indent: 2em;">
                {{newsDetail.content}}<br>
            </p>
        </div>
        </el-card>
      </div>
</template>

<script>

export default {
    data(){
        return{
            newsDetail:{

            },
            articleId:''
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
        }
    },
    beforeCreate() {
        this.$bus.$on('newsDetail',(data)=>{
            this.$bus.asd = data;
        })
    },
    mounted(){
        if(this.$bus.asd !=undefined){
            this.articleId = this.$bus.asd.id
            window.sessionStorage.removeItem('articleId')
            window.sessionStorage.setItem('articleId',this.articleId)
        }else{
            this.articleId=window.sessionStorage.getItem('articleId')
        }

        console.log(window.sessionStorage.getItem('articleId'))

        let data = ({
            id:this.articleId
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/articleDetails',data).then((response)=>{
            if(response.data.code=='201'){
                this.newsDetail = response.data.data
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

.sdf{
    color:red;
}
.news-new-detail {
    width: 60%!important;
    padding-left: 2%!important;
    padding-right: 2%!important;
}
.news-new-detail {
    box-sizing: border-box;
    margin: 20px auto 50px;
    display: flex;
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
    text-align: center;
}
.news-new-detail-left-subTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
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
    font-size: 14px;
    padding: 1px 0;
    position: relative;
    flex: 1;
    line-height: 14px;
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

</style>