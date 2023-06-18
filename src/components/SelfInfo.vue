<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="login-container">
        <el-form-item label="用户学号/工号" prop="schoolId">
          <el-input v-model.number="ruleForm.schoolId" autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="学院/专业" prop="major">
          <el-cascader
            :options="options"
            :props="{ checkStrictly: true }"
            clearable
            v-model="ruleForm.major"></el-cascader>
        </el-form-item>
  
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="ruleForm.password" show-password autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" show-password autocomplete="off" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="background-color:#29E6D3;border-color: #29E6D3;" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
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
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空！'));
        }else if (value !== this.ruleForm.password) {
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
          password: window.sessionStorage.getItem('password'),
          schoolId: parseInt(window.sessionStorage.getItem('schoolId')),
          userName:window.sessionStorage.getItem('userName'),
          phone:window.sessionStorage.getItem('phone'),
          checkPass:window.sessionStorage.getItem('password'),
          email:window.sessionStorage.getItem('email'),
          major:[window.sessionStorage.getItem('college'),window.sessionStorage.getItem('major')]
        },
        rules: {
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
    toRegister(){
        this.$message({
            message:'注册成功！',
            type:'success'
        })
        setTimeout(() =>{
            this.$router.push({path:'/login'})
        },1000)
    },
    submitForm(formName) {
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = ({
            schoolId:this.ruleForm.schoolId,
            username:this.ruleForm.userName,
            college:this.ruleForm.major[0],
            major:this.ruleForm.major[1],
            phone:this.ruleForm.phone,
            email:this.ruleForm.email,
            passHash:this.ruleForm.password
            }) 
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/user/edit',data).then((response)=>{
              if(response.data.code == '201'){
                this.$message({
                message:response.data.message,
                type:'success'
                }),
                // console.log(this.ruleForm)
                // window.sessionStorage.removeItem('schoolId')
                // window.sessionStorage.setItem('schoolId',this.ruleForm.schoolId)
                // window.sessionStorage.removeItem('userName')
                // window.sessionStorage.setItem('userName',this.ruleForm.userName)
                // window.sessionStorage.removeItem('college')
                // window.sessionStorage.setItem('college',this.ruleForm.major[0])
                // window.sessionStorage.removeItem('major')
                // window.sessionStorage.setItem('major',this.ruleForm.major[1])
                // window.sessionStorage.removeItem('phone')
                // window.sessionStorage.setItem('phone',this.ruleForm.phone)
                // window.sessionStorage.removeItem('email')
                // window.sessionStorage.setItem('email',this.ruleForm.email)
                // window.sessionStorage.removeItem('password')
                // window.sessionStorage.setItem('password',this.ruleForm.password)
                // 
                setTimeout(()=>{
                  this.$router.push({path:'/login'})
                  window.sessionStorage.clear();
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
        // console.log(this.ruleForm.major[0])
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
}
</script>
<style scoped>
</style>