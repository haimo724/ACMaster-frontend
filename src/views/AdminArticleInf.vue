<template>
  <el-card class="admin-article-inf">
    <div slot="header" class="clearfix">
      <div id="title">{{article.title}}</div>
      <span class="detail">
        类别：{{article.type === 1 ? '新闻' : article.type === 2 ? '活动' : '公告' }}
      </span>
      <span class="detail">
        状态：{{article.isTop ? '置顶' : '未置顶'}}
      </span>
      <span class="detail">
        作者：{{article.authorName}}
      </span>
      <span class="detail">
        发布时间：{{new Date(article.publishDatetime).format('Y-m-d H:i:s')}}
      </span>
    </div>
    <div>
      <p id="content">{{article.content}}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'NewArticle',
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    this.article = this.$store.state.tab.tempObj
  }
}
</script>

<style scoped>
.admin-article-inf {
  margin: 20px;
}
#title {
  margin: 20px;
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  text-align: center;
  color: #333;
}
.detail {
  padding-right: 20px;
  color: #666;
  font-size: 14px;
  line-height: 14px;
}
.detail:after {
  content: "";
  padding-left: 20px;
  border-right: 1px solid #e6e6e6;
}
#content {
  text-indent: 2em;
}
</style>
