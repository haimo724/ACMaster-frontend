<template>
  <div class="team">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>队伍管理</span>
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
  name: 'AdminTeam',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10
      },
      tableData: [
        {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }, {
          id: null,
          tid: 1,
          name: '空',
          intro: '空'
        }
      ],
      tableLabel: [
        {
          prop: 'tid',
          label: 'Id',
          width: 50
        }, {
          prop: 'name',
          label: '队名',
        }, {
          prop: 'intro',
          label: '介绍',
          width: 500
        }
      ],
      buttonList: [
        {
          name: '添加队员',
          type: 'primary',
          fc: (row) => {
            let item = this.tableData.find((obj) => { return obj.tid === row.tid })
            this.$store.commit('selectTab', [{'label': '队伍管理'}, {'label': '全部队伍'}, {'label': '添加队员'}])
            this.$store.commit('storeObj', { id: item.id, name: item.name })
            this.$router.push({ name: 'adminTeamAdduser' })
          }
        }, {
          name: '管理队员',
          type: 'success',
          fc: (row) => {
            let item = this.tableData.find((obj) => { return obj.tid === row.tid })
            this.$store.commit('selectTab', [{'label': '队伍管理'}, {'label': '全部队伍'}, {'label': '删除队员'}])
            this.$store.commit('storeObj', { id: item.id, name: item.name })
            this.$router.push({ name: 'adminTeamDeluser' })
          }
        }, {
          name: '修改信息',
          type: 'warning',
          fc: (row) => {
            let item = this.tableData.find((obj) => { return obj.tid === row.tid })
            this.$store.commit('selectTab', [{'label': '队伍管理'}, {'label': '全部队伍'}, {'label': '修改信息'}])
            this.$store.commit('storeObj', { id: item.id, name: item.name, intro: item.intro })
            this.$router.push({ name: 'adminTeamUpdate' })
          }
        }, {
          name: '删除队伍',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该队伍将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.teamDelete(({
                id: this.tableData.find((obj) => { return obj.tid === row.tid }).id
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
      api.teamList({
        page: (val1 - 1) * this.config.size
      }).then(res => {
        if (res.data.code === 201 || res.data.code === 200) {
          this.config.current = res.data.data.current
          this.config.total = res.data.data.totalPage * res.data.data.size
          this.config.size = res.data.data.size
          this.tableData = []
          res.data.data.listFromPage.forEach((element, index) => {
            let item = {
              id: element.id,
              tid: (res.data.data.current - 1) * res.data.data.size + index + 1,
              name: element.name,
              intro: element.intro
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
    this.thisPage(this.config.current)
  }
}
</script>

<style scoped>
.team {
  margin: 20px;
}
</style>
