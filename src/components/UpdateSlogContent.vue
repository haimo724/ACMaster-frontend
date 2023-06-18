<template>
    <div class="sdfg">
        <div class="sdfg2">
            <el-card class="box-card ">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" style="font-weight:bold;font-size:large;color:black">
                    <el-form-item label="你想提交的内容是" prop="type" style="width:50%">
                        <el-radio-group v-model="ruleForm.type" >
                            <el-radio :label="3">博客</el-radio>
                            <el-radio :label="6">内部题解</el-radio>
                            <el-radio :label="9">外部题解</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标题" prop="title" style="width:50%">
                        <el-input v-model="ruleForm.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <mavon-editor 
                            v-model="ruleForm.content" 
                            ref="md" 
                            @change="change" 
                            placeholder="请输入您的题解/博客内容...."
                            :ishljs="true"
                            style="height:500px;width:100%;justify-content: center;overflow: scroll;"
                        />
                    </el-form-item>
                    <el-form-item label="关联题目id" prop="coId" style="width:50%" v-if="isType2">
                        <el-input v-model="ruleForm.coId"></el-input>
                    </el-form-item>
                    <el-form-item label="关联题目标题" prop="coTitle" style="width:50%" v-if="isType3">
                        <el-input v-model="ruleForm.coTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="关联题目链接" prop="coLink" style="width:50%" v-if="isType3">
                        <el-input v-model="ruleForm.coLink"></el-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"  
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-form-item>
                    
                    <el-form-item style="text-align:center">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交更新</el-button>
                        <el-button type="warning" @click="submitForm2('ruleForm')">放入草稿箱</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            
        </div>
        
 
        <!-- <el-button type="success" @click="submit" style="right:30%;">提交</el-button> -->
        
    </div>
</template>
 
 
 
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    // 注册
    components: {
        mavonEditor,
    },
    data() {
        // var checkTitle = (rule,value,callback) =>{
        //     if(!value){
        //         return callback(new Error('标题不能为空！'));
        //     }
        // }
        var checkContent = (rule,value,callback) =>{
            if(!value){
                return callback(new Error('内容不能为空！'));
            }else{
                callback();
            }
        }
        return {
            dynamicTags: this.stringToArray(window.sessionStorage.getItem('tagList')) ,
            // dynamicTags:window.sessionStorage.getItem('tagList'),
            inputVisible: false,
            inputValue: '',
            ruleForm: {
                title: window.sessionStorage.getItem('title'),
                content:window.sessionStorage.getItem('content'), // 输入的markdown
                coId:window.sessionStorage.getItem('correspondingId'),
                coTitle:window.sessionStorage.getItem('correspondingTitle'),
                coLink:window.sessionStorage.getItem('correspondingLink'),
                type:1
            },
            rules: {
                // title: [
                //     { validator:checkTitle, trigger: 'blur' }
                // ],
                content: [
                    { validator:checkContent, trigger: 'blur' }
                ]
            },
            
            html:'',    // 及时转的html
        }
    },
    methods: {
        // 所有操作都会被解析重新渲染
        stringToArray(arr){
            return arr.split(','); /*好吧，这个比较喽 @_@ */
        },
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
        submit(){
            console.log(this.ruleForm.content);
            console.log(this.html);
        },
        submitForm(formName) {
            // console.log(this.$refs[formName])
            if(this.dynamicTags.length>=2){
                for(var i = 0;i<this.dynamicTags.length;i++){
                    for(var j = i+1;j<this.dynamicTags.length;j++){
                        if(this.dynamicTags[i] == this.dynamicTags[j]){
                            this.$message.error({
                                message:'有重复标签，请删除！'
                            })
                            return
                        }
                    }
                }
            }
            this.$refs[formName].validate((valid) => {
            console.log(valid)
            if (valid) {
                let data = ({
                    author : window.sessionStorage.getItem('schoolId'),
                    title:this.ruleForm.title,
                    content:this.html,
                    corresponding_id:this.ruleForm.coId,
                    corresponding_title:this.ruleForm.coTitle,
                    corresponding_link:this.ruleForm.coLink,
                    tagList:this.dynamicTags,
                    status:0,
                    id:window.sessionStorage.getItem('slogId'),
                    schoolId:window.sessionStorage.getItem('schoolId'),
                    slogId:window.sessionStorage.getItem('slogId')
                })
                console.log(data)
                this.$axios.post('http://127.0.0.1:9090/slog/updateSlog',data).then((response)=>{
                    if(response.data.code=='201'){
                        this.$message({
                            message:response.data.message,
                            type:'success'
                        })
                        setTimeout(()=>{
                            history.go(-1)
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
                // console.log(this.ruleForm.content);
                console.log('error submit!!');
                return false;
            }
        });
      },
      submitForm2(formName) {
        if(this.dynamicTags.length>=2){
            for(var i = 0;i<this.dynamicTags.length;i++){
                for(var j = i+1;j<this.dynamicTags.length;j++){
                    if(this.dynamicTags[i] == this.dynamicTags[j]){
                        this.$message.error({
                            message:'有重复标签，请删除！'
                        })
                        return
                    }
                }
            }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = ({
                author : window.sessionStorage.getItem('schoolId'),
                    title:this.ruleForm.title,
                    content:this.html,
                    corresponding_id:this.ruleForm.coId,
                    corresponding_title:this.ruleForm.coTitle,
                    corresponding_link:this.ruleForm.coLink,
                    tagList:this.dynamicTags,
                    status:3,
                    id:window.sessionStorage.getItem('slogId'),
                    schoolId:window.sessionStorage.getItem('schoolId'),
                    slogId:window.sessionStorage.getItem('slogId')
            })
            this.$axios.post('http://127.0.0.1:9090/slog/updateSlog',data).then((response)=>{
                if(response.data.code=='201'){
                    this.$message({
                        message:response.data.message,
                        type:'success'
                    })
                    setTimeout(()=>{
                        history.go(-1)
                    },2000)
                }else{
                    this.$message.error({
                        message:response.data.message,
                    })
                }
            }).catch((error)=>{
                console.log(error)
            })
            } else {
            // console.log(this.ruleForm.content);
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        // eslint-disable-next-line no-unused-vars
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    computed:{
        isType2(){
            if(this.ruleForm.type == 3){
                return false
            }else{
                return true
            }
        },
        isType3(){
            if(this.ruleForm.type == 9){
                return true
            }else{
                return false
            }
        }
    },
    created(){
        if((window.sessionStorage.getItem('correspondingId') === 'null'||window.sessionStorage.getItem('correspondingId') === "")&&
        (window.sessionStorage.getItem('correspondingTitle') === 'null'||window.sessionStorage.getItem('correspondingTitle') === "")
         &&(window.sessionStorage.getItem('correspondingLink')==='null'||window.sessionStorage.getItem('correspondingLink')=== "")){
            this.ruleForm.type = 3
        }else if((window.sessionStorage.getItem('correspondingTitle') === 'null'||window.sessionStorage.getItem('correspondingTitle') === "")
        &&(window.sessionStorage.getItem('correspondingLink')=== 'null'||window.sessionStorage.getItem('correspondingLink')=== "")){
            this.ruleForm.type = 6
        }else{
            this.ruleForm.type = 9
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.sdfg{
    width:80%;
    margin-left: 10%;
    margin-right:10%;
}
.sdfg2{
    margin-top:20px;
    padding:10px;
}
.el-card ::v-deep .el-card__body {
  padding:30px;
}
.el-tag{
    background-color: white;
    color:#606266;
    border-color: #DCDFE6;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
margin-left: 10px;
height: 32px;
line-height: 30px;
padding-top: 0;
padding-bottom: 0;
}
.input-new-tag {
width: 90px;
margin-left: 10px;
vertical-align: bottom;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #29E6D3;
    background: #29E6D3;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #29E6D3 !important;
}
</style>