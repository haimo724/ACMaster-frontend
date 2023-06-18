<template>
  <div>
      <BackTop></BackTop>
      <CanvasBack></CanvasBack>
      <PCNavigation></PCNavigation>
      <div style="padding:10%;padding-top:30px;padding-bottom:40px;min-height:1000px">
            <el-card class="box-card">
                <div class="portal-personal-center__main">
                    <div class="portal-personal-center__main__side">
                        <div class="sw-portrait el-row" style="margin-top:20px;">
                            <div class="profile el-row">
                                <div style="position: relative;">
                                    <span class="keep-hue el-avatar el-avatar--circle" style="border: 1px solid rgb(230, 230, 230); width: 110px; height: 110px; border-radius: 90px; cursor: pointer;">
                                        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">
                                    </span>
                                </div>
                            </div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 18px;">{{userName}}</div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 12px;">{{major}}</div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 12px;">博客数量：{{blogCount}}</div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 12px;">题解数量：{{solutionCount}}</div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 12px;">提交代码数量：{{codeCount}}</div>
                            <div style="text-align: center; color: rgb(51, 51, 51); margin-top: 10px; font-size: 12px;">获赞数量：{{goodCount}}</div>
                        </div>
                        <div style="padding: 0px 20px;">
                            <div class="el-divider el-divider--horizontal"></div>
                        </div>
                        <div></div>
                        <SlideNavigation></SlideNavigation>
                    </div>
                    <router-view style="width:100%;height:100%;padding:20px"></router-view>
                </div>
            </el-card>
        </div>
      <PCFooter></PCFooter>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop.vue';
import CanvasBack from '@/components/CanvasBack.vue';
import PCFooter from '@/components/PC-Footer.vue';
import SlideNavigation from '@/components/SlideNavigation.vue';
import PCNavigation from '@/components/PC-Navigation.vue';
export default {
    name:'InfoCenter',
    components: { BackTop, CanvasBack, PCFooter, SlideNavigation, PCNavigation},
    data(){
        return{
            userName:window.sessionStorage.getItem('userName'),
            major:window.sessionStorage.getItem('major'),
            blogCount:0,
            codeCount:0,
            solutionCount:0,
            goodCount:0
        }
    },
    created(){
        let data = ({
            schoolId:window.sessionStorage.getItem('schoolId')
        })
        // this.$axios.defaults.withCredentials = true
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/user/info',data).then((response)=>{
            if(response.data.code == '201'){
                this.blogCount = response.data.data.blogCount
                this.solutionCount = response.data.data.solutionCount
                this.codeCount = response.data.data.codeCount

                this.goodCount = response.data.data.goodCount
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

</script>
<style scoped>
.el-card ::v-deep .el-card__body {
  padding-top: 10px;
}
.portal-personal-center__main {
    margin-top: 12px;
    border-radius: 6px;
    display: flex;
    height: 100%;
    background: #fff;
}
.portal-personal-center__main .portal-personal-center__main__side {
    width: 20%;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    border-right: 1px solid #e6e6e6;
    border-radius: 6px 0 0 6px;
}
.el-row {
    position: relative;
    box-sizing: border-box;
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
}
.el-divider {
    background-color: #dcdfe6;
    position: relative;
}
</style>