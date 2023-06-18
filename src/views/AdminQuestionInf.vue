<template>
  <el-row class="home" :gutter="20">

    <el-col class="box1" :span="14">

      <el-card class="admin-article-inf" style="height: 800px;">
        <div slot="header" class="clearfix">
          {{question.title}}
        </div>
        <div>
          <div class="ptitle">题目描述</div>
          <p id="content">{{question.description}}</p>
          <div class="ptitle">输入描述</div>
          <p id="content">{{question.inputDescription}}</p>
          <div class="ptitle">输入样例</div>
          <p id="content">{{question.inputExample}}</p>
          <div class="ptitle">输出描述</div>
          <p id="content">{{question.outputDescription}}</p>
          <div class="ptitle">输出样例</div>
          <p id="content">{{question.outputExample}}</p>
          <div class="ptitle">提示</div>
          <p id="content">{{question.hint}}</p>
          <div class="ptitle">来源</div>
          <p id="content">{{question.origin}}</p>
        </div>
      </el-card>

    </el-col>

    <el-col :span="4">
      <el-card shadow="hover" style="margin-top: 20px; height:460px;">
        <div slot="header" class="clearfix">
          题目信息
        </div>
        <div>
          <div class="detail">
            作者：{{question.authorId}}
          </div>
          <div class="detail">
            时间限制：{{question.timeLimit}} ms
          </div>
          <div class="detail">
            内存限制：{{question.memoryLimit}} kb
          </div>
          <div class="detail">
            难度：{{question.rank === 1 ? '低' : question.rank === 2 ? '中' : '高'}}
          </div>
          <div class="detail">
            状态：{{question.status === 1 ? '可见' : '不可见'}}
          </div>
          <div class="detail">
            io类型：{{question.ioType === 1 ? '标准' : '文件'}}
          </div>
        </div>
      </el-card>
    </el-col>
  
  </el-row>

</template>

<script>
import api from '../../api/data.js'
export default {
  name: 'NewArticle',
  data () {
    return {
      question: {}
    }
  },
  mounted () {
    if (this.$store.state.tab.isUpdate) {
      api.problemInfo(({
        id: this.$store.state.tab.tempObj.id
      })).then(res => {
        console.log(res)
        if (res.data.code === 201 || res.data.code === 200) {
          this.question = res.data.data
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
      this.$store.commit('updated')
    }
    
  }
}
</script>

<style scoped>
.box1 {
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
  margin: 10px;
  padding-right: 20px;
  color: #666;
  font-size: 14px;
  line-height: 14px;
}
#content {
  text-indent: 2em;
}
</style>
