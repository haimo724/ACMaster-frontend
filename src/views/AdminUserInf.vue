<template>
  <el-row class="home" :gutter="20">

    <el-col class="box1" :span="8">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span class="card-title">用户信息</span>
        </div>
        <div class="user">
          <el-avatar :src="managerImg" :size="70"></el-avatar>
          <span>
            <p class="name">{{user.userName}}</p>
            <p class="role">{{user.role}}</p>
          </span>
        </div>
        <el-divider></el-divider>
        <div class="userinfo">
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">学号：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.schoolId}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">学院：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.college}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">专业：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.major}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">所属队伍：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.team}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">电话：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.phone}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">邮箱：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.email}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">训练时长：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.trainDuration}} h</p></el-col>
          </el-row>
        </div>
      </el-card>

      <el-card id="cloudWord" shadow="hover" style="margin-top: 20px; height:460px;">

      </el-card>
    </el-col>

    <el-col :span="5">
      <el-card shadow="hover" style="margin-top: 20px; height:850px;">
        <div slot="header" class="clearfix">
          <span class="card-title">最新活动</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in timeline"
            :key="index"
            :timestamp="activity.datetime">
            {{activity.title}}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>

  </el-row>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud'
import api from '../../api/data.js'
export default {
  name: 'AdminHome',
  data () {
    return {
      managerImg: require('../assets/images/logo.png'),
      timeline: [
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'},
        {title:'123232', datetime:'2022-4-12'}
      ],
      user: {
        userName: '空',
        schoolId: '空',
        college: '空',
        major: '空',
        team: '空',
        phone: '空',
        email: '空',
        role: '空',
        trainDuration: '空',
        status: '空',
        tagsList: []
      }
    }
  },
  mounted () {
    this.user = this.$store.state.tab.tempObj.user
    switch (this.$store.state.tab.tempObj.user.role) {
        case 1:
            this.user.role = '普通用户'
            break
        case 2:
            this.user.role = '分队队长'
            break
        case 3:
            this.user.role = '基地队长'
            break
        case 4:
            this.user.role = '指导教师'
            break
        case 5:
            this.user.role = '超级管理员'
    }
    switch (this.$store.state.tab.tempObj.user.status) {
        case 1:
        this.user.status = '现役'
        break
        case 0:
        this.user.status = '退役'
        break
        default:
        this.user.status = '注销'
    }
    let cloud = echarts.init(document.getElementById('cloudWord'))
    cloud.setOption({
      backgroundColor: '#fff', // canvas背景颜色
      // canvas标题配置项
      title: {
          text: '',
          top: '0%',
          left: '-1%',
          textStyle: {
              fontSize: 14,
              color: '#3B3E41',
              fontWeight: 'normal'
          }
      },
      series: [
        {
          type: 'wordCloud',
          left: '0%',                 // X轴偏移量
          top: '0%',                  // Y轴偏移量
          width: '100%',               // canvas宽度大小
          height: '100%',              // canvas高度大小
          sizeRange: [12, 50],         //  词典字体大小范围配置
          rotationRange: [0, 0],       // 词典字体旋转角度配置，默认不旋转
          gridSize: 25,                // 词典字体间距配置
          layoutAnimation: true,       // 为false词典过度会阻塞
          textStyle: {                 // 词典样式配置
            normal: {
              color() {
                // 颜色随机渐变
                let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
                return colors[parseInt(Math.random() * 10)]
              }
            }
          },
          // 渲染词典数据
          data: [
            // {
            //   value: '50',          // 词典大小配置
            //   name: 'iPhone 13',    // 词典名称配置
            //   textStyle: {          // 单独配置某个词典样式
            //   shadowBlur: 4,
            //   shadowOffsetY: 14,
            //   color: '#BDBEFA'
            //   }
            // },
            ...this.$store.state.tab.tempObj.tagCountList
          ]
        }
      ]
    })
    api.timeline({schoolId:	this.user.schoolId}).then(res => {
      if (res.data.code === 201 || res.data.code === 200) {
        if (res.data.data) {
          this.timeline = []
          res.data.data.forEach(element => {
            this.timeline.push({
              title: element.title,
              datetime: new Date(element.datetime).format('Y-m-d')
            })
          })
          console.log(this.timeline)
        }
      } else {
        this.$message.error({
          message: res.data.message
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less" scoped>
.box1 {
  margin-top: 20px;
  margin-left: 20px;
}
.user {
  display: flex;
  margin-top: 20px;
  .name {
    font-size: 24px;
    margin: 8px 30px 2px;
  }
  .role {
    font-size: 14px;
    margin: 0;
    margin-left: 32px;
    color: grey;
  }
}
.userinfo {
  .el-row {
    margin-top: 2px;
  }
  p {
    margin: 0;
  }
  .userinfo-key {
    font-size: 14px;
    color: grey;
  }
}
</style>
