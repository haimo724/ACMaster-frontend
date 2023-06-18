<template>
  <div>
    <BackTop></BackTop>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <NewsDetailContent></NewsDetailContent>
    <big-footer></big-footer>
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
import NewsDetailContent from '@/components/NewsDetailContent.vue'
export default {
    name:"NewsDetail",
    components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    NewsDetailContent
}
}

</script>
<style scoped>
</style>