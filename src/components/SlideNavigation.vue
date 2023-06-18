<template>
  <div>
    <el-menu
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        background-color="white"
        text-color="black"
        active-text-color="#29E6D3"
        :router="true">
        <el-menu-item index="selfinfo" :route="{name:'selfinfo'}">
            <i class="el-icon-user"></i>
            <span slot="title" type="password" @click="dialogFormVisible = true">个人信息修改</span>
            <el-dialog title="请输入密码用于验证" :visible.sync="dialogFormVisible" :before-close="handleClose" class="my-info-dialog">
                <el-form :model="form">
                    <el-input type="password" :rows="10" v-model="form.repassword" autocomplete="off" style="width:80%;margin-left: 10%;"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;cancel()">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false;confirm()">确 定</el-button>
                </div>
            </el-dialog>
        </el-menu-item>
        <!-- <el-menu-item index="changepic" :route="{name:'changepic'}">
            <i class="el-icon-picture-outline-round"></i>
            <span>修改头像</span>
        </el-menu-item> -->
        <el-menu-item index="selfslog" :route="{name:'selfslog'}">
            <i class="el-icon-reading"></i>
            <span slot="title">我的文章</span>
        </el-menu-item>
        <el-menu-item index="selfcode" :route="{name:'selfcode'}">
            <i class="el-icon-s-data"></i>
            <span slot="title">我的代码</span>
        </el-menu-item>
        <el-menu-item index="draft" :route="{name:'draft'}">
            <i class="el-icon-document-remove"></i>
            <span slot="title">我的草稿箱</span>
        </el-menu-item>
        <el-menu-item index="timeline" :route="{name:'timeline'}">
            <i class="el-icon-date"></i>
            <span slot="title">时间线</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialogFormVisible: false,
            form:{
                repassword:''
            }
        }
    },
    methods: {
      handleClose(done) {
        this.$message({
        message:'您已取消输入',
        type:'info'
        })
        done();
        history.go(-1);
          
      },
      confirm(){
        if(this.form.repassword == window.sessionStorage.getItem('password')){
            this.$message({
                message:'验证成功，您可以继续操作',
                type:'success'
            })
        }else{
            this.$message.error({
                message:'验证失败，请重新输入密码'
            })
            history.go(-1)
        }
      },
      cancel(){
        this.$message({
            message:'您已取消输入',
            type:'info'
        })
        history.go(-1);
      }
    }
}

</script>
<style>
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
.my-info-dialog .el-dialog {
    width:30%;
    border:2px solid #29E6D3;
    border-radius:10px;
}
</style>