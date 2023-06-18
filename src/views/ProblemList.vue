<template>
  <div>
    <BackTop></BackTop>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <ProblemListContent></ProblemListContent>
    <big-footer></big-footer>
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
import ProblemListContent from '@/components/ProblemListContent.vue'
export default {
    name:"NewsList",
    components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    ProblemListContent
}
}

</script>
<style scoped>
</style>