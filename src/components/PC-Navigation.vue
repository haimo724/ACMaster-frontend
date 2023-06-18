<template>
  <div>
    <div class="naviplace">
      <el-menu
        :default-active="$route.name"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="white"
        text-color="black"
        active-text-color="#29E6D3"
        :router="true">
        <el-menu-item index="12" style="width:8%" disabled></el-menu-item>
        <el-menu-item index="12"  style="width:7%;text-align: center;" disabled>
          <img src="../assets/40BBAF3213941640F65C2D824292AB98.png" style="width:50px;height:80%">
        </el-menu-item>
        <el-menu-item index="main" :route="{name:'main'}"><i class="el-icon-s-home"></i>首页</el-menu-item>
        <el-menu-item index="newslist" :route="{name:'newslist'}"><i class="el-icon-news"></i>新闻/活动</el-menu-item>
        <el-menu-item index="slog" :route="{name:'slog'}"><i class="el-icon-edit"></i>技术分享</el-menu-item>
        <el-menu-item index="problemlist" :route="{name:'problemlist'}"><i class="el-icon-reading"></i>题目</el-menu-item>
        <el-menu-item index="teamlist" :route="{name:'teamlist'}"><i class="el-icon-s-flag"></i>分队</el-menu-item>
        <el-menu-item index="messagelist" :route="{name:'messagelist'}"><i class="el-icon-chat-line-round"></i>留言</el-menu-item>
        
        <el-menu-item index="" style="width:17%">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable>
              <el-button slot="append" icon="el-icon-search" @click="toGlobalSearch" style="padding-left:7px;padding-right:7px"></el-button>
            </el-input>
          </div>
        </el-menu-item>
        <el-menu-item index="qrcode" :route="{name:'qrcode'}" v-show="isRole"><img src="../assets/二维码2.png" style="width:34px;height:60%"></el-menu-item>
        <el-menu-item index="23"  style="width:3%" disabled></el-menu-item>
        <el-menu-item>
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </el-menu-item>
        <el-menu-item >
          <el-dropdown>
            <span class="el-dropdown-link">
              {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toInfo">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="reset">退出登录</el-dropdown-item>
              <el-dropdown-item v-show="isAdmin" @click.native="toAdmin">进入管理员界面</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div> 
  </div>
</template>

<script>
// var sre = window.length.href;
let key1 = "0"
export default {
    
    data() {
      return {
        // activeIndex: '2',
        // activeIndex2: '2',
        input:'',
        name:sessionStorage.getItem('userName')
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        // if(key == "1" || key == "2" || key == "3" || key == "4" || key == "5"){
        key1 = key;
        // }
        
      },
      toMain(){
        this.$router.push({path:'/main'});
      },
      toSlog(){
        this.$router.push({path:'/Slog'});
      },
      toNewsList(){
        this.$router.push({path:'/newslist'})
      },
      toInfo(){
        this.$router.push({path:'/info'});
      },
      reset(){
        this.$router.push({path:'/login'})
        window.sessionStorage.clear();
      },
      toAdmin(){
        this.$router.push({path:'/adminMain'})
      },
      toGlobalSearch(){
        window.sessionStorage.removeItem('search')
        window.sessionStorage.setItem('search',this.input)
        let s = this.$router.history.current.path
        this.$router.push({path:'/globalsearch'})
        // location.reload()
        if(s == '/globalsearch'){
          location.reload()
        }
      }
    },
    computed:{
      isAdmin(){
        if(window.sessionStorage.getItem('role')>1){
          return true
        }else{
          return false
        }
      },
      isRole(){
        if(window.sessionStorage.getItem('role')>1){
          return true
        }else{
          return false
        }
      },
      activeIndex2:function(){
        if(key1 == "0"){
          return "1";
        }
        
        return key1;
        
        // const routepath = this.$router.path;
        // if(routepath.indexOf("/main")>=0){
        //   return "1"
        // }
        // if(routepath.indexOf("/Slog")>=0){
        //   return "2"
        // }
        // return "1"
      }
    },
    created(){
      this.input = window.sessionStorage.getItem('search')
    }
}

</script>
<style scoped>
.active{
  text-decoration: none;
}
.el-menu-item.is-disabled {
    opacity: 1;
    cursor: not-allowed;
    background: 0 0!important;
}
</style>