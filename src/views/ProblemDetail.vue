<template>
  <div>
    <BackTop></BackTop>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <ProblemDetailContent></ProblemDetailContent>
    <big-footer></big-footer>
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
import ProblemDetailContent from '@/components/ProblemDetailContent.vue'
export default {
    name:"NewsList",
    components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    ProblemDetailContent
}
}

</script>
<style scoped>
</style>