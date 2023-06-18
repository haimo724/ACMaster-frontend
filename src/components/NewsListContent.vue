<template>
  <div data-v-8f4c44c2 class="newsNew">
      <div data-v-8f4c44c2 class="news-center-filter">
          <div data-v-8f4c44c2 class="z-segment is-round" style="font-weight: bold;">
            <div class="z-segment-item first">新闻/活动</div>
          </div>
         
      </div>
      <div data-v-8f4c44c2 element-loading-background="rgba(0, 0, 0, 0)" class="newsNew-main-content">
          <div data-v-5773a1c6 data-v-8f4c44c2 class="child-news">
              <div data-v-5773a1c6 class="child-news-main">
                  <div data-v-5773a1c6 element-loading-background="rgba(0, 0, 0, 0)" class="child-news-main-content" style="width:100%" >
                    <div data-v-5773a1c6 class="child-news-main-content-list" v-for="(item,index) in newsList" :key="index">
                        <div data-v-5773a1c6 class="child-news-main-content-list-item keep-hue">
                            <div data-v-0c03838e data-v-5773a1c6 class="news-item">
                                <div data-v-0c03838e class="news-item-right readed-active">
                                    <p data-v-0c03838e class="news-item-right-title ">
                                        <a @click="toDetail(item)" data-v-0c03838e class="title oneRowEllipsis" style="text-decoration:none">
                                            {{item.title}}
                                        </a>
                                        <img  data-v-0c03838e v-if="item.isTop" src="../assets/istop.png" style="height:40px" class="new">
                                    </p>
                                    <p data-v-0c03838e class="news-item-right-desc  threeRowEllipsis" style="height: 66px; margin-top: 10px;">
                                    {{item.articleAbstract}}
                                    </p>
                                    <div data-v-c24c3b86 data-v-0c03838e class="content-list-foot mt10">
                                        <span data-v-c24c3b86 class="mr10">发布日期：{{formatDate(item.publishDatetime)}}</span>
                                        <span data-v-c24c3b86 class="Ce6e6e6 mr10">|</span>
                                        <span data-v-c24c3b86 class="oneRowEllipsis releaseDeptName">发布者：{{item.authorId}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <el-pagination
                        layout="prev, pager, next"
                        :total="50" style="text-align:center;margin-top: 7px;background-color: rgba(213, 234, 240, 0.96)">
                    </el-pagination> -->
                    <el-pagination
                        layout="total,prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-size="page.size"
                        :pager-count="7"
                        :page-count="page.totalPage"
                        style="text-align:center;margin-top: 7px;background-color: rgba(213, 234, 240, 0.96)">
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
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'},
            // {title:'航天学院在全国高等学校航空航天类专业本科毕业设计成果交流会上再获佳绩',content:'2022年5月28~29日，第三届全国高等学校航空航天类专业本科毕业设计成果交流会在南京理工大大学举办。旨在进一步提高全国高等学校航空航天类专业实验实践教育教学水平，着力增强学生的创新创业能力和综合实',author:'航天学院',time:'2022-5-29'}   
            ],
            page:{
            currentPage:null,
            size: null,
            totalPage:null
            },
            item:{},
        }
    },
    methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d')
        },
        toDetail(item){
            this.$router.push({path:'/newsdetail'});
            this.item = item
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            let data = ({
            page:(this.page.currentPage-1)*this.page.size
            })
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/articleDetails',data).then((response)=>{
                if(response.data.code == '201'){
                    this.newsList.length = 0
                    for(var i=0;i<response.data.data.listFromPage.length;i++){
                        this.newsList.push(response.data.data.listFromPage[i])
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
        let data = ({
            page:0
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/article/newsList',data).then((response)=>{
            if(response.data.code == '201'){
                for(var i=0;i<response.data.data.listFromPage.length;i++){
                    this.newsList.push(response.data.data.listFromPage[i])
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
    beforeDestroy(){
        this.$bus.$emit('newsDetail',this.item)
    }
}

</script>
<style>
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
    color:#333;
    flex: 1;
}
.news-item-right-title .title[data-v-0c03838e]:hover{
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