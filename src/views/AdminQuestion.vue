<template>
  <div class="question">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>题目管理</span>
      </div>
      <div id="rbt-box">

        <span>难度</span>
        <el-select
          v-model="config.rank"
          placeholder=""
          @change="changePage()"
        >
          <el-option
            v-for="item in config.option1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <span>可见</span>
        <el-select
          v-model="config.status"
          placeholder=""
          @change="changePage()"
        >
          <el-option
            v-for="item in config.option2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
  name: 'AdminQuestion',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10,
        rank: 0,
        status: -1,
        option1: [
          {
            label: 'All',
            value: 0
          }, {
            label: 'Low',
            value: 1
          }, {
            label: 'Mid',
            value: 2
          }, {
            label: 'High',
            value: 3
          }
        ],
        option2: [
          {
            label: 'All',
            value: -1
          }, {
            label: '可见',
            value: 1
          }, {
            label: '不可见',
            value: 0
          }
        ]
      },
      tableData: [
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        },
        {
          id: '',
          title: '空',
          rank: '空',
          status: '空',
          authorId: '空'
        }
      ],
      tableLabel: [
        {
          prop: 'id',
          label: 'Id',
        }, {
          prop: 'title',
          label: '题目',
        }, {
          prop: 'rank',
          label: '难度',
        }, {
          prop: 'status',
          label: '可见性',
        }, {
          prop: 'authorId',
          label: '作者',
        }
      ],
      buttonList: [
        {
          name: '隐藏',
          type: 'primary',
          fc: (row) => {
            this.$confirm('该题目将被隐藏, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let item = this.tableData.find((obj) => { return obj.id === row.id })
              api.problemSeeable(({
                displayId: item.id,
                status: item.status === '可见' ? 0 : 1
              })).then(res => {
                if (res.data.code === 201 || res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.data.message
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
        }, {
          name: '查看',
          type: 'success',
          fc: (row) => {
            let item = this.tableData.find((obj) => { return obj.id === row.id })
            this.$store.commit('selectTab', [{'label': '题目管理'}, {'label': '全部题目'}, {'label': '查看题目'}])
            this.$store.commit('storeObj', { id: item.id })
            this.$router.push({ name: 'adminQuestionInf' })
          }
        }, {
          name: '修改',
          type: 'warning',
          fc: (row) => {
            let item = this.tableData.find((obj) => { return obj.id === row.id })
            this.$store.commit('selectTab', [{'label': '题目管理'}, {'label': '全部题目'}, {'label': '查看题目'}])
            this.$store.commit('storeObj', { id: item.id })
            this.$router.push({ name: 'adminQuestionUpdate' })
          }
        }, {
          name: '删除',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该题目将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.problemDelete(({
                id: this.tableData.find((obj) => { return obj.id === row.id }).id
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
      ]
    }
  },
  mounted () {
    this.thisPage(this.config.current, this.config.rank, this.config.status)
  },
  methods: {
    changePage () {
      this.thisPage(this.config.current, this.config.rank, this.config.status)
    },
    thisPage (val1, val2, val3) {
      console.log('page changed')
      api.problemList({
        page: (val1 - 1) * this.config.size,
        rank: val2,
        status: val3
      }).then(res => {
        if (res.data.code === 201 || res.data.code === 200) {
          this.config.current = res.data.data.current
          this.config.total = res.data.data.totalPage * res.data.data.size
          this.config.size = res.data.data.size
          this.tableData = []
          res.data.data.listFromPage.forEach((element) => {
            let item = {
              id: element.displayId,
              title: element.title,
              rank: '空',
              status: '空',
              authorId: element.authorId
            }
            switch (element.rank) {
              case 1:
                item.rank = '低'
                break;
              
              case 2:
                item.rank = '中'
                break;
              
              case 3:
                item.rank = '高'
                break;
            }
            switch (element.status) {
              case 1:
                item.status = '可见'
                break;

              case 0:
                item.status = '不可见'
                break;
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
  }
}
</script>

<style lang="less" scoped>
.question {
  margin: 20px;
}
#rbt-box {
  span {
    margin-right: 20px;
    margin-left: 20px;
  }
  .el-select {
    width: 100px;
  }
}
</style>

