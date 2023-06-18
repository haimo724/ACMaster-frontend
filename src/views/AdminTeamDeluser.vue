<template>
  <div class="team">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>删除队员</span>
      </div>
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :buttonList="buttonList"
        :config="config"
        :changePage="changePage"
      ></common-table>
    </el-card>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import api from '../../api/data.js'
export default {
  name: 'TeamDeluser',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10,
        teamID: 0
      },
      tableData: [
        {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          id: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }, {
          schoolId: null,
          tid: 1,
          name: '空'
        }
      ],
      tableLabel: [
        {
          prop: 'tid',
          label: 'Id',
          width: 50
        }, {
          prop: 'name',
          label: '姓名',
        }, {
          prop: 'schoolId',
          label: '学号'
        }
      ],
      buttonList: [
        {
          name: '删除',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该队员将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.teamDeluser(({
                schoolId: this.tableData.find((obj) => { return obj.tid === row.tid }).schoolId,
                id: this.config.teamID
              })).then(res => {
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
    }
  },
  methods: {
    changePage () {
      this.thisPage(this.config.current)
    },
    thisPage (val1) {
      console.log('page changed')
      api.teamUserList({
        page: (val1 - 1) * this.config.size,
        id: this.config.teamID
      }).then(res => {
        if (res.data.code === 201 || res.data.code === 200) {
          this.config.current = res.data.data.current
          this.config.total = res.data.data.totalPage * res.data.data.size
          this.config.size = res.data.data.size
          this.tableData = []
          res.data.data.listFromPage.forEach((element, index) => {
            let item = {
              tid: (res.data.data.current - 1) * res.data.data.size + index + 1,
              name: element.userName,
              schoolId: element.schoolId
            }
            this.tableData.push(item)
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
    if (this.$store.state.tab.isUpdate) {
      this.config.teamID = this.$store.state.tab.tempObj.id
      this.$store.commit('updated')
    }
    this.thisPage(this.config.current)
  }
}
</script>

<style scoped>
.team {
  margin: 20px;
}
</style>
