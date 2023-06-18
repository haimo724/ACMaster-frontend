<template>
  <div style="padding:50px;padding-left: 100px;padding-right:100px;">
    <el-row :gutter="20">
        <el-col :span="20"><div class="grid-content bg-purple">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h3>{{problem.title}}</h3>
                    <!-- <h4>出题人：{{problem.author_id}} 难度：{{problem.rank == '1'?"低":problem.rank == '2'?"中":problem.rank == '3'?"高":""}}</h4> -->
                </div>
                <div id="problem-content" class="markdown-body">
                    <p class="title">描述</p>
                    <p class="content">{{problem.description}}</p>
                    <p class="title">输入</p>
                    <p class="content">{{problem.inputDescription}}</p>
                    <p class="title">输出</p>
                    <p class="content">{{problem.outputDescription}}</p>
                    <div class="flex-container sample">
                        <div class="sample-input">
                            <p class="title">
                                "输入样例"
                                <a class="copy"><i class="el-icon-s-order"></i></a>
                            </p>
                            <pre>
                                {{problem.inputExample}}
                            </pre>
                        </div>
                        <div class="sample-output">
                            <p class="title">
                                输出样例
                            </p>
                            <pre>
                               {{problem.outputExample}}
                            </pre>
                        </div>
                    </div>
                    <div>
                        <p class="title">提示</p>
                        <div style="padding:20px;border: 1px solid #dddee1;border-color: #e9eaec;">
                            {{problem.hint}}
                        </div>
                    </div>
                    <!-- <p class="title">时间限制</p>
                    <p class="content">{{problem.time_limit}} ms</p>
                    <p class="title">内存限制</p>
                    <p class="content">{{problem.memory_limit}} kb</p> -->
                    <p class="title">标签</p>
                    <p class="content">
                        <el-tag type="info" v-for="(item,index) in this.problem.tags" :key="index" style="margin:5px">{{item}}</el-tag>
                    </p>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top:20px">
                <div style="display:inline-block" class="qw">
                    <p style="float:left">语言：</p>
                    <el-select v-model="value" placeholder="请选择" size="small" style="float:left;height:20px;margin-top: 12px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div style="display:inline-block;float:right" class="qw" >
                    <p style="float:left">主题：</p>
                    <el-select v-model="value2" placeholder="请选择" size="small" style="float:left;height:20px;margin-top: 12px;">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @click.native="changeTheme(item)"
                        >
                        </el-option>
                    </el-select>
                </div>
                <!-- <MyEditor ref="asd" v-model="code" language="dockerfile" title="dockerfile"></MyEditor> -->
                <div class="container">
                    <editor
                    ref="aceEditor"
                    v-model="content"
                    @init="editorInit"
                    width="100%"
                    height="300"
                    lang="javascript"
                    :theme="theme"
                    :options="{
                        enableBasicAutocompletion: true,
                        enableSnippets: true,
                        enableLiveAutocompletion: true,
                        tabSize:6,
                        fontSize:14,
                        showPrintMargin:false,   //去除编辑器里的竖线
                    }"
                    ></editor>
                    <!-- <el-button type="primary" size="small" @click="getValue">获 取</el-button>
                    <el-button type="primary" size="small" @click="pre">上一个主题</el-button>
                    <el-button type="primary" size="small" @click="next">下一个主题</el-button> -->
                    
                </div>
                <el-button  size="small" @click="submit" style="float:right;margin-bottom: 10px;margin-top:10px;background-color:#f90;color:aliceblue">提交</el-button>
            </el-card>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
            <el-card  style="text-align:center" >
                <a @click="toSubmit" class="info">提交信息</a>
            </el-card>
            <el-card  style="text-align:center;margin-top:10px">
                <a @click="toSolution" class="info">查看题解</a>
            </el-card>
            <el-card style="font-size:14px;margin-top:14px">
                <div class="ivu-card-head">
                    题目信息
                </div>
                <div class="ivu-card-body">
                    <ul>
                        <li>
                            <p>ID</p>
                            <p>{{problem.displayId}}</p>
                        </li>
                        <li>
                            <p>时间限制</p>
                            <p>{{problem.timeLimit}} ms</p>
                        </li>
                        <li>
                            <p>内存限制</p>
                            <p>{{problem.memoryLimit}} kb</p>
                        </li>
                        <li>
                            <p>IO类型</p>
                            <p>{{problem.ioType == 1?"标准IO":problem.ioType == 2?"文件IO":""}}</p>
                        </li>
                        <li>
                            <p>出题人</p>
                            <p>{{problem.authorId}}</p>
                        </li>
                        <li>
                            <p>难度</p>
                            <p>{{problem.rank == '1'?"低":problem.rank == '2'?"中":problem.rank == '3'?"高":""}}</p>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-card style="margin-top:14px">
                <div class="echart" id="mychart" :style="myChartStyle"></div>
            </el-card>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {

    components: {
        editor: require("vue2-ace-editor")
    },
    data(){
        return{
            myChart: {},
            pieData: [
            //     {
            //     value:234,
            //     name:'AC'
            // },{
            //     value:345,
            //     name:'WA'
            // }
            ],
            pieName: [],
            myChartStyle: { float: "left", width: "100%", height: "400px" },
            code:'',
            options: [{
            value: 'C',
            label: 'C'
            }, {
            value: 'C++',
            label: 'C++'
            }, {
            value: 'Java',
            label: 'Java'
            }, {
            value: 'Python',
            label: 'Python'
            }, {
            value: 'JavaScript',
            label: 'JavaScript'
            }],
            value: '',
            problem:{
                // title:'二分查找',
                // tags:[{
                //     tagName:'121'
                // },{
                //     tagName:'23232'
                // }]
            },
            dialogVisible:false,
            content: "",
            theme:'',
            num:0,
            value2:'',
            arr:[ //将brace/theme文件夹下的所有主题名字拷贝出来
                'ambiance',
                'chaos',
                'chrome',
                'clouds',
                'clouds_midnight',
                'cobalt',
                'crimson_editor',
                'dawn',
                'dracula',
                'dreamweaver',
                'eclipse',
                'github',
                'gob',
                'gruvbox',
                'idle_fingers',
                'iplastic',
                'katzenmilch',
                'kr_theme',
                'kuroir',
                'merbivore',
                'merbivore_soft',
                'monokai',
                'mono_industrial',
                'pastel_on_dark',
                'solarized_dark',
                'solarized_light',
                'sqlserver',
                'terminal',
                'textmate',
                'tomorrow',
                'tomorrow_night',
                'tomorrow_night_blue',
                'tomorrow_night_bright',
                'tomorrow_night_eighties',
                'twilight',
                'vibrant_ink',
                'xcode',
            ],
            options2:[{
                value:'ambiance',
                label:'ambiance'
            },{
                value:'chaos',
                label:'chaos'
            },{
                value:'chrome',
                label:'chrome'
            },{
                value:'clouds',
                label:'clouds'
            },{
                value:'clouds_midnight',
                label:'clouds_midnight'
            },{
                value:'github',
                label:'github'
            },{
                value:'eclipse',
                label:'eclipse'
            },{
                value:'twilight',
                label:'twilight'
            },{
                value:'terminal',
                label:'terminal'
            },]
        }
    },
    methods:{
        initDate() {
        for (let i = 0; i < this.pieData.length; i++) {
            // this.xData[i] = i;
            // this.yData =this.xData[i]*this.xData[i];
            this.pieName[i] = this.pieData[i].name;
        }
        },
        initEcharts() {
        // 饼图
        const option = {
            legend: {
            // 图例
            data: this.pieName,
            right: "10%",
            top: "10%",
            orient: "vertical"
            },
            title: {
            // 设置饼图标题，位置设为顶部居中
            text: "统计",
            top: "0%",
            left: "center"
            },
            series: [
            {
                type: "pie",
                label: {
                show: true,
                position:'inner',
                formatter: "{b} : {c}\n({d}%)" // b代表名称，c代表对应值，d代表百分比
                },
                radius: "80%", //饼图半径
                data: this.pieData
            }
            ],
            color:['red', 'rgb(36, 201, 36)']
        };
        console.log(this.seriesData);
        // eslint-disable-next-line no-unused-vars
        const optionFree = {
            xAxis: {},
            yAxis: {},
            series: [
            {
                data: this.seriesData,
                type: "line",
                smooth: true
            }
            ]
        };
        this.myChart = echarts.init(document.getElementById("mychart"));
        this.myChart.setOption(option);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
            this.myChart.resize();
        });
        },
        editorInit() {//初始化
        require("brace/ext/language_tools"); //language extension prerequsite...
        require("brace/mode/javascript"); //language
        // require("brace/theme/tomorrow_night");
        for (let i = 0; i < this.arr.length; i++) {//方便看哪个主题好看，循坏加载了所有主题，通过点击按钮切换
            require("brace/theme/"+this.arr[i])
        }
        require("brace/snippets/javascript"); //snippet
        },
        getValue(){//获取编辑器中的值
        //   console.log('编辑器中的值：'+this.$refs.aceEditor.editor.getValue())
        //   console.log('编辑器中第一个换行符的位置：'+this.$refs.aceEditor.editor.getValue().indexOf('\n'))
            return this.$refs.aceEditor.editor.getValue()
        },
        changeTheme(val){
            this.theme = val.value
        },
        submit(){
            console.log(this.content)
            let data = ({
                authorId:window.sessionStorage.getItem('schoolId'),
                problemId:window.sessionStorage.getItem('problemId'),
                code:this.content,
                language:this.value
            })
            this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/submitCode',data).then((response)=>{
                if(response.data.code == '201'){
                    this.$message({
                        message:response.data.message,
                        type:'success'
                    })
                    window.sessionStorage.removeItem('code')
                    window.sessionStorage.setItem('code',this.content)
                    window.sessionStorage.removeItem('language')
                    window.sessionStorage.setItem('language',this.value)
                }
            }).catch((error)=>{
            console.log(error)
            })
        },
        toSubmit(){
            this.$router.push({path:'/problemsubmission'})
        },

        toSolution(){
            this.$router.push({path:'/solutionlist'})
            
        }
        },
    created(){
        this.content = window.sessionStorage.getItem('code')
        // this.value = window.sessionStorage.getItem('language')
        let language = window.sessionStorage.getItem('language')
        if(language == 1){
            this.value = 'Java'
        }else if(language == 2){
            this.value = 'C'
        }else if(language == 3){
            this.value = 'C++'
        }else if(language == 4){
            this.value = 'Python'
        }else if(language == 5){
            this.value = 'JavaScript'
        }
        // let data = ({
        //     problemId:window.sessionStorage.getItem('problemId')
        // })
        // this.$axios.post('http://127.0.0.1:9090/problem/problemDetail',data).then((response)=>{
        //     if(response.data.code == '201'){
        //         this.problem = response.data.data
        //         // let sdf = ({
        //         //     value:response.data.data.submission_pass,
        //         //     name:'AC'
        //         // },{
        //         //     value:response.data.data.submission_wrong,
        //         //     name:'WA'
        //         // })
        //         // this.pieData.push(sdf)
        //         // console.log(this.pieData[0].value)
        //     }else{
        //         this.$message.error({
        //             message:response.data.message
        //         })
        //     }
        // }).catch((error)=>{
        //     console.log(error)
        // })
    },
    mounted() {
    this.editorInit();
    this.theme = 'chrome'
    // let data2 = {
    //     value:23,
    //     name:'WA'
    // }
    // this.pieData.push(data2)
    // let data = {
    //     value:76,
    //     name:'AC'
    // }
    // this.pieData.push(data)
    // console.log(this.pieData)
    this.content = window.sessionStorage.getItem('code')
        let data = ({
            problemId:window.sessionStorage.getItem('problemId')
        })
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/problem/problemDetail',data).then((response)=>{
            if(response.data.code == '201'){
                this.problem = response.data.data
                let sdf1 = {
                    value:response.data.data.submissionWrong,
                    name:'WA'
                }
                this.pieData.push(sdf1)
                let sdf2 = {
                    value:response.data.data.submissionPass,
                    name:'AC'
                }
                this.pieData.push(sdf2)
                console.log(this.pieData)
            }else{
                this.$message.error({
                    message:response.data.message
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    setTimeout(()=>{
        this.initDate(); //数据初始化
        this.initEcharts();
    },500)
    
  }
}

</script>
<style scoped>
.info:hover{
    color: #29E6D3;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
#problem-content .title {
    font-size: 20px;
    font-weight: 400;
    margin: 25px 0 8px;
    color: #29E6D3;
}
#problem-content p.content {
    margin-left: 25px;
    margin-right: 20px;
    font-size: 15px;
}
#problem-content .sample {
    -ms-flex-align: stretch;
    align-items: stretch;
}
.flex-container {
    display: flex;
    width: 100%;
    max-width: 100%;
    justify-content: space-around;
    align-items: flex-start;
    flex-flow: row nowrap;
}

#problem-content .sample-input, #problem-content .sample-output {
    width: 50%;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 5%;
}
#problem-content .sample pre{
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    border-style: solid;
    background: transparent;
}

.markdown-body pre {
    padding: 5px 10px;
    white-space: pre-wrap;
    margin-top: 15px;
    margin-bottom: 15px;
    background: #f8f8f9;
    border: 1px dashed #e9eaec;
    font-family: Consolas,Menlo,Courier,monospace;
}
.ivu-card-head {
    border-bottom: 1px solid #e9eaec;
    padding: 16px 0;
    line-height: 1;
}
.ivu-card-body ul{
    list-style-type: none;
    padding:0
}
.ivu-card-body ul li{
    border-bottom: 1px dotted #e9eaec;
    margin-bottom: 10px;
}
.ivu-card-body ul li p{
    display: inline-block;
}
.ivu-card-body ul li p:first-child{
    width:90px
}
.ivu-card-body ul li p:last-child{
    float:right
}
/* .zxc{
    text-align:center;background-image:linear-gradient(to right,#c7f0f1,#80dada, #09d2e0);
    color:#e9eaec
} */
</style>