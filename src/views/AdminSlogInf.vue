<template>
  <el-card class="admin-slog-inf">
    <div slot="header" class="clearfix">
      <div id="title">{{inf.title}}</div>
      <span
        id="detail"
        v-for="(item, index) in inf.details"
        :key="index"
      >
        {{item.label}}：{{item.value}}
      </span>
    </div>
    <div>
      <p id="content" v-html="inf.content"></p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AdminSlogInf',
  data () {
    return {
      inf: {}
    }
  },
  mounted () {
    this.inf = this.$store.state.tab.tempObj
  }
}
</script>

<style lang="less" scoped>
.admin-slog-inf {
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
#detail {
  padding-right: 20px;
  color: #666;
  font-size: 14px;
  line-height: 14px;
}
#detail:after {
  content: "";
  padding-left: 20px;
  border-right: 1px solid #e6e6e6;
}
#content {
  text-indent: 2em;
}
</style>
