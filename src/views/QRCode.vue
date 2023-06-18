<template>
  <div>
    <back-top></back-top>
    <navigation></navigation>
    <CanvasBack></CanvasBack>
    <div style="height:800px;text-align: center;">
        <br>
        <h2>请扫描二维码进行签到</h2>
        <h2>离开的时候请扫描二维码结束签到</h2>
        <h2>训练时长不能长于两小时，否则自动清空</h2>
        <img :src="'data:image/png;base64,'+image" style="margin-top: 120px;" alt="">
        
    </div>
    <big-footer></big-footer>
    
  </div>
</template>

<script>
import Navigation from '../components/PC-Navigation.vue'
import BigFooter from '../components/PC-Footer.vue'
import BackTop from '../components/BackTop.vue'
import CanvasBack from '../components/CanvasBack.vue'
// let Base64 = require('js-base64').Base64
export default {
  name:'Main-asa',
  components:{
    Navigation,
    BigFooter,
    BackTop,
    CanvasBack,
  },
  data(){
    return{
      image:'',
      c:0,
      timer:null
    }
  },
  methods:{
      getUrl(){
          this.$axios.get('http://127.0.0.1:9090/qrcode/getQRCode?schoolId='+window.sessionStorage.getItem('schoolId')).then((response)=>{
          if(response.data.code == 201){
            this.image = response.data.data.image
            console.log(123)
          }else{
            this.$message.error({
              message:response.data.message
            })
          }
          this.timer = setTimeout(()=>{
            this.getUrl()
            this.c++
          },15000)
          if(this.c ==20){
            clearTimeout(this.timer)
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
  },
  created(){
      this.getUrl()
  },
  beforeDestroy(){
      clearTimeout(this.timer)
      this.timer = null
  }
}
</script>
<style scoped>
</style>