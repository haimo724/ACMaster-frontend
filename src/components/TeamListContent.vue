<template>
  <div data-v-8f4c44c2 class="newsNew">
      <div data-v-8f4c44c2 class="news-center-filter">
          <div data-v-8f4c44c2 class="z-segment is-round" style="font-weight: bold;">
            <div class="z-segment-item first">分队</div>
          </div>
         
      </div>
      <div data-v-8f4c44c2 element-loading-background="rgba(0, 0, 0, 0)" class="newsNew-main-content">
          <div data-v-5773a1c6 data-v-8f4c44c2 class="child-news">
              <div data-v-5773a1c6 class="child-news-main">
                  <div data-v-5773a1c6 element-loading-background="rgba(0, 0, 0, 0)" class="child-news-main-content" style="width:100%">
                    <el-card class="box-card" style="margin-bottom:10px"  v-for="(item,index) in teamList" :key="index">
                        <div slot="header" class="headerter">
                            <div class="header-left" style="height:40px">
                                <div style="float:left">
                                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-left:10px;margin-right:10px;float: left;"></el-avatar>
                                    <div style="float:left;height:40px;padding-top: 10px;"><span>{{item.teamName}}</span></div>
                                    
                                </div>
                                <div style="float:right;height:40px;padding-top: 10px;font-size:small"><span>成立时间：{{formatDate(item.build_datetime)}}</span></div>
                            </div>
                           
                        </div>
                        <el-table
                            :data="item.tableData"
                            style="width: 100%;color:#333"
                            >
                            <el-table-column
                                prop="leader"
                                label="管理员"
                                width="140">
                            </el-table-column>
                            <el-table-column
                                prop="member"
                                label="所有的队员（包括管理员）"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="intro"
                                label="介绍">
                            </el-table-column>
                            </el-table>
                    </el-card>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// let sd = document.getElementById('href');
// let re = sd.attributes["href"].nodeValue;
// console.log(re);
// let sd = document.getElementById('href');
// if(item.problemLink==null){
//     sd.className='display';
// }
export default {
    name:'TeamListContent',
    data(){
        return{
            
            teamList:[
                
            ]
        }
    },
    methods:{
        formatDate(val){
            return new Date(val).format('Y-m-d H:i:s')
        },
        // qwe(){
        //     console.log(this.teamList[0].tableData[0].leader)
        // }
    },
    created(){
        this.$axios.post('http://127.0.0.1:4523/m1/1038100-0-default/team/viewTeam').then((response)=>{
            if(response.data.code=='201'){
                console.log(response.data.data.length)
                for(var i = 0;i<response.data.data.length;i++){
                    let members = ''
                    for(var j = 0;j<response.data.data[i].userNameList.length-1;j++){
                        members+=(response.data.data[i].userNameList[j])
                        members+='，'
                    }
                    members+=response.data.data[i].userNameList[response.data.data[i].userNameList.length-1]
                    let admins = ''
                    for(var t = 0;t<response.data.data[t].adminNameList.length - 1;t++){
                        admins += (response.data.data[i].adminNameList[t])
                        admins += '，'
                    }
                    admins+=response.data.data[i].adminNameList[response.data.data[i].adminNameList.length-1]
                    let num = ({
                        teamName:response.data.data[i].team.name,
                        avaturPath:response.data.data[i].team.avatarPath,
                        build_datetime:response.data.data[i].team.buildDatetime,
                        tableData:[{
                            leader: admins,
                            member:members,
                            intro:response.data.data[i].team.intro
                        }]
                    })
                    // console.log(2)
                    this.teamList.push(num)
                }
            }
        })
    }
}
// console.log(this.teamList.tableData.leader)
</script>
<style scoped>
.tag{
    float:left;
    font-size: small;
    margin-left: 7px;
    padding: 3px 7px;
    border:1px solid #dddee1;
    border-radius:32px;
    font-weight: initial;
}
.header-left{
    height:27px;
}
.sdf{
    color:red;
}
.headerter{
    font-size: large;
    font-weight:bold;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: black;
}

.headerter :hover>.qqq{
    color:#29E6D3;
}
.file-content-field {
    max-height: 300px;
    overflow: hidden;
}
hr {
    background: none !important;
    height: 1px !important;
    border: 0 !important;
    border-top: 1px solid #eee !important;
}
.btn-group-justified {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
}
.btn-group-justified .btn-group {
    display: table-cell;
    float: none;
    width: 1%;
}
.btn-group{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.newsNew[data-v-8f4c44c2] {
    width: 60%!important;
    padding-left: 2%!important;
    padding-right: 2%!important;
}
.newsNew[data-v-8f4c44c2] {
    box-sizing: border-box;
    margin: 30px auto 50px;
    width: 1680px;
    width: 760px;
}
.news-center-filter .z-segment {
    height: 40px;
    background-color: transparent;
}
.z-segment.is-round {
    background-color: #666;
    border-radius: 20px;
}
.news-center-filter .z-segment .z-segment-item {
    line-height: 40px;
    background-color: hsla(0,0%,100%,.9);
    color: #333;
}
.news-center-filter .z-segment .z-segment-item {
    font-size: 18px;
    padding: 0 28px;
}
.z-segment {
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    position: relative;
    border-radius: 4px;
    background-color: #f5f7fa;
}
.newsNew .news-center-filter[data-v-8f4c44c2] {
    margin-bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.newsNew .newsNew-main-content[data-v-8f4c44c2] {
    margin-top: 30px;
}
.child-news[data-v-5773a1c6] {
    width: 100%;
}
.child-news-main[data-v-5773a1c6] {
    display: flex;
}
.child-news-main-content[data-v-5773a1c6] {
    background: rgba(255, 255, 255, 0.96);
    width: calc(100% - 454px);
    /* min-height: calc(100vh); */
    border-radius: 6px;
}
.child-news-main-content-list[data-v-5773a1c6] {
    padding-top: 20px;
}
.child-news-main-content-list-item[data-v-5773a1c6] {
    padding: 0 40px;
}
.keep-hue {
    filter: var(--color-filter,hue-rotate(0deg));
}
.news-item[data-v-0c03838e] {
    display: flex;
    border-bottom: 1px solid aliceblue;
    padding: 10px 0;
}
.news-item-right[data-v-0c03838e] {
    width: 100%;
}
.news-item-right.readed-active .news-item-right-title[data-v-0c03838e] {
    color: #666;
}
.news-item-right-title[data-v-0c03838e] {
    max-width: 100%;
    color: #333;
    font-weight: 700;
    font-size: 16px;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
}
.news-item-right-title .title[data-v-0c03838e] {
    color:rgb(15, 187, 199);
    flex: 1;
}
.news-item-right-title .title[data-v-0c03838e] :hover{
    color:rgb(93, 228, 238);
}
.oneRowEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.news-item-right-title .new[data-v-0c03838e] {
    width: 30px;
    height: 16px;
    margin-left: 10px;
}
.news-item-right-title img[data-v-0c03838e] {
    width: 30px;
    height: 16px;
    margin-right: 10px;
}
.news-item-right-desc[data-v-0c03838e] {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 22px;
    max-height: 66px;
}
.threeRowEllipsis {
    -webkit-line-clamp: 3;
}
.content-list-foot[data-v-c24c3b86] {
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
}
.mt10 {
    margin-top: 10px;
}
.mr10 {
    margin-right: 10px;
}
.Ce6e6e6 {
    color: aliceblue;
}
.content-list-foot .releaseDeptName[data-v-c24c3b86] {
    width: calc(100% - 190px);
}
.oneRowEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


</style>