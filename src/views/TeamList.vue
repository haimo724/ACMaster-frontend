<template>
  <div>
    <BackTop></BackTop>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <TeamListContent></TeamListContent>
    <big-footer></big-footer>
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
import TeamListContent from '@/components/TeamListContent.vue'
export default {
    name:"NewsList",
    components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    TeamListContent
}
}

</script>
<style scoped>
</style>