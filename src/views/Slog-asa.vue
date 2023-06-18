<template>
  <div>
    <BackTop></BackTop>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <SlogContent></SlogContent>
    <big-footer></big-footer>
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
import SlogContent from '@/components/SlogContent.vue'
export default {
    name:"Slog-asa",
    components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
    SlogContent
}
}

</script>
<style scoped>
</style>