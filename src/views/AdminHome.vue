<template>
  <el-row class="home" :gutter="20">

    <el-col class="box1" :span="8">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span class="card-title">个人信息</span>
        </div>
        <div class="user">
          <el-avatar :src="managerImg" :size="70"></el-avatar>
          <span>
            <p class="name">{{user.name}}</p>
            <p class="role">{{user.role}}</p>
          </span>
        </div>
        <el-divider></el-divider>
        <div class="userinfo">
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">权限等级：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.rank}}</p></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><p class="userinfo-key">状态：</p></el-col>
            <el-col :span="10"><p class="userinfo-value">{{user.status}}</p></el-col>
          </el-row>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px; height:460px;">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
            header-align="center"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-card>

    </el-col>

    <el-col :span="15">
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card shadow="hover" style="height: 260px">
            <e-charts :sty="'height: 240px'" :options="chatData.chat1"></e-charts>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" style="height: 260px">
            <e-charts :sty="'height: 240px'" :options="chatData.chat2"></e-charts>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card shadow="hover" style="height: 260px">
            <e-charts :sty="'height: 240px'" :options="chatData.chat3"></e-charts>
          </el-card>
          <el-card shadow="hover" style="margin-top: 20px; height:140px;">
            <el-table :data="regData">
              <el-table-column
                v-for="(val, key) in regLabel"
                :key="key"
                :prop="key"
                :label="val"
                header-align="center"
                align="center"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" style="height: 320px">
            <div slot="header" class="clearfix">
              <span class="card-title">队伍人数</span>
            </div>
            <e-charts :sty="'height: 260px'" :isAxisChart="true" :options="chatData.chat4"></e-charts>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import axapi from '../../api/data.js'
import ECharts from '@/components/ECharts'
export default {
  name: 'AdminHome',
  components: {
    ECharts
  },
  data () {
    return {
      managerImg: require('../assets/images/logo.png'),
      user: {
        name: '空',
        role: '空',
        rank: '空',
        status: '空'
      },
      tableData: [
        {
          name: '空',
          num: '空'
        }
      ],
      tableLabel: {
        name: '名称',
        num: '数量'
      },
      regData: [
        {
          name: '空',
          value: '空'
        }
      ],
      regLabel: {
        name: '开关',
        value: '状态'
      },
      chatData: {
        chat1: { series: [{type: 'pie', data: []}] },
        chat2: { series: [{type: 'pie', data: []}] },
        chat3: { series: [{type: 'pie', data: []}] },
        chat4: { }
      }
    }
  },
  mounted () {
    axapi.getAdminHome({schoolId: 3}).then(res => {
      if (res.data.code === 201 || res.data.code === 200) {
        this.user.name = window.sessionStorage.getItem('userName')
        switch (window.sessionStorage.getItem('role')) {
          case '1':
            this.user.role = '普通用户'
            this.user.rank = '10'
            break
          case '2':
            this.user.role = '分队队长'
            this.user.rank = '100'
            break
          case '3':
            this.user.role = '基地队长'
            this.user.rank = '150'
            break
          case '4':
            this.user.role = '指导老师'
            this.user.rank = '200'
            break
          case '5':
            this.user.role = '超级管理员'
            this.user.rank = '255'
            break
          default : this.user.role = '非法数据'
        }
        switch (window.sessionStorage.getItem('status')) {
          case 1:
            this.user.status = '现役'
            break
          case 0:
            this.user.status = '退役'
            break
          default:
            this.user.status = '注销'
        }
        this.tableData = [
          {
            name: '用户总数',
            num: res.data.data.count.userNum
          }, {
            name: '管理员人数',
            num: res.data.data.count.managerNum
          }, {
            name: '公告数',
            num: res.data.data.count.noticeNum
          }, {
            name: '新闻数',
            num: res.data.data.count.newsNum
          }, {
            name: '活动数',
            num: res.data.data.count.activityNum
          }, {
            name: '博客数',
            num: res.data.data.count.slogNum
          }, {
            name: '题解数',
            num: res.data.data.count.answerNum
          }, {
            name: '队伍数',
            num: res.data.data.responseTeamList.length
          }
        ]
        this.chatData.chat1.series[0].data = [
          {
            name: '公告数',
            value: Number.parseInt(res.data.data.count.noticeNum)
          }, {
            name: '新闻数',
            value: Number.parseInt(res.data.data.count.newsNum)
          }, {
            name: '活动数',
            value: Number.parseInt(res.data.data.count.activityNum)
          }
        ]
        this.chatData.chat2.series[0].data = [
          {
            name: '分享',
            value: Number.parseInt(res.data.data.count.blogNum)
          }, {
            name: '题解',
            value: Number.parseInt(res.data.data.count.answerNum)
          }
        ]
        this.chatData.chat3.series[0].data = [
          {
            name: '普通用户',
            value: Number.parseInt(res.data.data.count.userNum)
          }, {
            name: '管理员',
            value: Number.parseInt(res.data.data.count.managerNum)
          }
        ]
        this.chatData.chat4 = {
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              data: [],
              type: 'bar'
            }
          ]
        }
        res.data.data.responseTeamList.forEach(team => {
          this.chatData.chat4.xAxis.data.push(team.team.name)
          this.chatData.chat4.series[0].data.push(team.userNameList.length)
        })
      } else {
        this.$message.error({
          message: res.data.message
        })
      }
    }).catch(error => {
      console.log(error)
    })
    axapi.currentRegisterStatus().then(res => {
      if (res.data.code === 201 || res.data.code === 200) {
        this.regData = [
          {
            name: '注册开关',
            value: res.data.data ? 'enable' : 'disable'
          }
        ]
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
