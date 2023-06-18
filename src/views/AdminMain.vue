<template>
  <div class="main">
      <el-container id="bigbox">
        <el-header>
            <common-header></common-header>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside'
import CommonHeader from '@/components/CommonHeader'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
#bigbox {
    height: 100%;
}
.el-header {
    background-color: rgb(61, 62, 70);
}
.el-main {
    padding: 0;
}
</style>
