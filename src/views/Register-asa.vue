<template>
  <div class="register-box">
    <h2>Register</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="login-container">
        <el-form-item label="用户学号/工号" prop="schoolId" class="clickPosition">
          <el-input v-model.number="ruleForm.schoolId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="userName" class="clickPosition">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学院/专业" prop="major" class="clickPosition">
          <el-cascader
            :options="options"
            :props="{ checkStrictly: true }"
            clearable
            v-model="ruleForm.major"></el-cascader>
        </el-form-item>
  
        <el-form-item label="手机号" prop="phone" class="clickPosition">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" class="clickPosition">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" class="clickPosition">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass" class="clickPosition">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>

        <a href="#" @click="toRegister('ruleForm')" style="margin-left:30px;">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
        </a>
        <router-link to="/login" style="margin-left:70px">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
        </router-link>
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
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        var reg=/^1[3-9][0-9]{9}$/
        setTimeout(() => {
          if (!reg.test(value)){
            callback(new Error('不符合手机号格式！'))
          }
          else{
            callback();
          }
          
        }, 1000);
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
          if(!emailReg.test(value)){
            callback(new Error('邮箱格式有问题'));
          }else{
            callback();
          }
        }, 1000);
      };
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          let emailReg = /^[\u4e00-\u9fa5]+$/;
          if(!emailReg.test(value)){
            callback(new Error('人名有问题'));
          }else{
            callback();
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        options:[{
            value:'软件学院',
            label:'软件学院',
            children:[{
                value:'软件工程',
                label:'软件工程'
            }]
        },{
            value:'计算机学院',
            label:'计算机学院',
            children:[{
                value:'计算机科学与技术',
                label:'计算机科学与技术',
            },{
                value:'物联网',
                label:'物联网'
            },{
                value:'大数据',
                label:'大数据'
            }]
        }],
        ruleForm: {
          password: '',
          schoolId: '',
          userName:'',
          phone:'',
          checkPass:'',
          email:'',
          major:'',
          imageUrl: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          schoolId: [
            { validator: checkSchoolId, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          userName: [
            { validator: checkUserName, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
        toRegister(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = ({
            schoolId:parseInt(this.ruleForm.schoolId),
            username:this.ruleForm.userName,
            college:this.ruleForm.major[0],
            major:this.ruleForm.major[1],
            phone:this.ruleForm.phone,
            email:this.ruleForm.email,
            passHash:this.ruleForm.password
            })  
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/user/register',data).then((response)=>{
              if(response.data.code == '201'){
                this.$message({
                message:response.data.message,
                type:'success'
                }),
                setTimeout(()=>{
                  this.$router.push({path:'/login'})
                },2000)
              }else{
                this.$message.error({
                  message:response.data.message
                })
              }
              
            }).catch((error)=>{ 
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
          });
            // this.$message({
            //     message:'注册成功！',
            //     type:'success'
            // })
            // setTimeout(() =>{
            //     this.$router.push({path:'/login'})
            // },1000)
          // let data = ({
          //   schoolId:this.ruleForm.schoolId,
          //   userName:this.ruleForm.userName,
          //   college:this.ruleForm.major[0],
          //   major:this.ruleForm.major[1],
          //   phone:this.ruleForm.phone,
          //   email:this.ruleForm.email,
          //   passHash:this.ruleForm.password
          // })
          // this.$axios.post('http://127.0.0.1:9090/user/register',data).then((response)=>{
          //   this.$message({
          //     message:response.data.message,
          //     type:'success'
          //   }),
          //   setTimeout(()=>{
          //     this.$router.push({path:'/login'})
          //   },3000)
          // }).catch(function(error){
          //   console.log(error);
          // })
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