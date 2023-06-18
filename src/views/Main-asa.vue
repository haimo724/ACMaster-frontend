<template>
  <div>
    <back-top></back-top>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <!-- <el-empty></el-empty>
    <el-empty></el-empty>
    <el-empty></el-empty>
    <el-empty></el-empty> -->
    <MainContent></MainContent>
    <big-footer></big-footer>
    
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import MainContent from '../components/MainContent.vue'
import CanvasBack from '../components/CanvasBack.vue'
export default {
  name:'Main-asa',
  components:{
    Navigation,
    BigFooter,
    BackTop,
    MainContent,
    CanvasBack,
},
}
</script>
<style scoped>
</style>