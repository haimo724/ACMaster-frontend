<template>
  <div class="register-box">
    <h2>AdminLogin</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="login-container" autocomplete="off">
        <el-form-item label="用户学号/工号" prop="schoolId" class="clickPosition">
          <el-input v-model.number="ruleForm.schoolId" autocomplete="off"></el-input>
        </el-form-item>
  
        <el-form-item label="密码" prop="password" class="clickPosition">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <a @click="toLogin('ruleForm')" style="margin-left:50px">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
        </a>
        <router-link to="/register" style="margin-left:100px">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Register
        </router-link>
        <br>
        <br>
        <el-button type="primary" style="color:aliceblue;border: 0;margin-right: 40px;margin-left: 50px;" @click="toLogin2"><i class="el-icon-user"></i>用户登录</el-button>
        <el-popover
            placement="bottom"
            title="你是傻呗吗"
            width="200"
            trigger="click"
            content="赶紧联系基地最丑的人--小胖队长！！">
            <span slot="reference" style="font-size:medium;color:aliceblue">忘记密码</span>
        </el-popover>
    </el-form>
    
</div>
</template>
 
 
<script>
    export default {
        data() {
        var checkSchoolId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学号/工号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'));
          } else {
            if(value.toString().length!= 10){
              callback(new Error('必须是10位数'));
            }else{
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          schoolId: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          schoolId: [
            { validator: checkSchoolId, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      toLogin(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = ({
              schoolId:this.ruleForm.schoolId,
              passHash:this.ruleForm.password
            })
            this.$axios.post('http://127.0.0.1:9090/admin/user/login',data).then((response)=>{
              if(response.data.code == '201'){
                this.$message({
                  message:response.data.message,
                  type:'success'
                }),
                window.sessionStorage.setItem('userName',response.data.data.userName);
                window.sessionStorage.setItem('schoolId',response.data.data.schoolId);
                window.sessionStorage.setItem('college',response.data.data.college);
                window.sessionStorage.setItem('major',response.data.data.major);
                window.sessionStorage.setItem('phone',response.data.data.phone);
                window.sessionStorage.setItem('email',response.data.data.email);
                window.sessionStorage.setItem('headshotPath',response.data.data.headshotPath);
                window.sessionStorage.setItem('password',this.ruleForm.password);
                setTimeout(()=>{
                  this.$router.push({path:'/adminMain'})
                },2000)
              }else{
                this.$message.error({
                  message:response.data.message
                })
              }
              
            }).catch((error)=>{
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toLogin2(){
          this.$router.push({path:'/login'})
      }
    },
    mounted () {
    document.getElementsByTagName('body')[0].className = 'sbody'
    },
    destroyed () {
        document.body.removeAttribute('class')
    }
    }
</script>
 
<style>
  /* #poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 10% auto;
    width: 370px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  } */

html {
  height: 100%;
}
.sbody {
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.register-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.register-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.register-box .user-box {
  position: relative;
}

.register-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.register-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.register-box .user-box input:focus ~ label,
.register-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.register-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 25px;
  letter-spacing: 4px
}

.register-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.register-box a span {
  position: absolute;
  display: block;
}

.register-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.register-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.register-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.register-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

.clickPosition .el-form-item__label{
  color:#fff;
}

 
 
</style>