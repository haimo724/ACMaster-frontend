<template>
  <div class="user">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <div id="rbt-box">
        <span>注册开关</span>
        <el-switch
          v-model="config.regButton"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeButton()"
        ></el-switch>
      </div>
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :buttonList="buttonList"
        :config="config"
        :changePage="changePage"
        :disButton="true"
      ></common-table>
    </el-card>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import api from '../../api/data.js'
export default {
  name: 'AdminUser',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10,
        regButton: true
      },
      buttonList: [
        {
          name: '查看',
          type: 'success',
          fc: (row) => {
            api.userInf(
              {
              schoolId: this.tableData.find((obj) => { return obj.id === row.id }).schoolId
              }
            ).then(res => {
              if (res.data.code === 201 || res.data.code === 200) {
                this.$store.commit('selectTab', [{'label': '用户管理'}, {'label': '全部用户'}, {'label': '查看用户'}])
                this.$store.commit('storeObj', res.data.data)
                this.$router.push({ name: 'adminUserInf' })
              } else {
                this.$message.error({
                  message: res.data.message
                })
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }, {
          name: '修改',
          type: 'warning',
          fc: (row) => {
            api.userInf({
              schoolId: this.tableData.find((obj) => { return obj.id === row.id }).schoolId
            }).then(res => {
              if (res.data.code === 201 || res.data.code === 200) {
                console.log(res.data.data)
                this.$store.commit('selectTab', [{'label': '用户管理'}, {'label': '全部用户'}, {'label': '修改用户'}])
                this.$store.commit('storeObj', res.data.data.user)
                this.$router.push({ name: 'adminUserUpdate' })
              } else {
                this.$message.error({
                  message: res.data.message
                })
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }, {
          name: '删除',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该分享将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(this.tableData.find((obj) => { return obj.id === row.id }).schoolId)
              api.userDelete({
                id: this.tableData.find((obj) => { return obj.id === row.id }).schoolId
              }).then(res => {
                if (res.data.code === 201 || res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '完成'
                  })
                } else {
                  this.$message.error({
                    message: res.data.message
                  })
                }
              }).catch(error => {
                console.log(error)
              })
              this.changePage()
            }).catch((error) => {
              console.log(error)
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        }
      ],
      tableData: [
        {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }, {
          id: '0',
          name: '123',
          schoolId: '2019303030',
          role: '管理员',
          rank: '150'
        }
      ],
      tableLabel: [
        {
          prop: 'id',
          label: 'Id'
        }, {
          prop: 'name',
          label: '姓名'
        }, {
          prop: 'schoolId',
          label: '学号'
        }, {
          prop: 'role',
          label: '身份'
        }, {
          prop: 'rank',
          label: '权限等级'
        }
      ]
    }
  },
  methods: {
    changePage () {
      this.thisPage(this.config.current)
    },
    changeButton () {
      this.$confirm('整个系统的注册都将关闭/打开,你确定此操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.changeRegisterSwitch({
          buttonId: this.config.regButton ? 1 : 0
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        })
      }).catch(() => {
        this.config.regButton = !this.config.regButton
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    thisPage (val1) {
      console.log('page changed')
      api.userList({
        page: (val1 - 1) * this.config.size,
      }).then(res => {
        if (res.data.code === 201 || res.data.code === 200) {
          this.config.current = res.data.data.current
          this.config.total = res.data.data.totalPage * res.data.data.size
          this.config.size = res.data.data.size
          this.tableData = []
          res.data.data.listFromPage.forEach((element, index) => {
            let user = {
              uid: element.id,
              id: (res.data.data.current - 1) * res.data.data.size + index + 1,
              name: element.userName,
              schoolId: element.schoolId
            }
            switch (element.role) {
              case 1:
                user.role = '普通用户'
                user.rank = 10
                break
              case 2:
                user.role = '分队队长'
                user.rank = 100
                break
              case 3:
                user.role = '基地队长'
                user.rank = 150
                break
              case 4:
                user.role = '指导教师'
                user.rank = 200
                break
              case 5:
                user.role = '超级管理员'
                user.rank = 255
                break
              default:
                user.role = '未知身份'
                user.rank = 255
            }
            this.tableData.push(user)
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.thisPage(this.config.current)
    api.currentRegisterStatus().then(res => {
      if (res.data.code === 201 || res.data.code === 200) {
        this.config.regButton = !!res.data.data
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
.user {
  margin: 20px;
}
#rbt-box {
  span {
    margin-right: 10px;
    color: gray;
  }
}
</style>
