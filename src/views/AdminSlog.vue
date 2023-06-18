<template>
  <div class="slog">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分享\题解 管理</span>
      </div>
      <div id="rbt-box">
        <span>类别</span>
        <el-select
          v-model="config.type"
          placeholder=""
          @change="changePage()"
        >
          <el-option
            v-for="item in config.options"
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
  name: 'AdminSlog',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10,
        type: 0,
        options: [
          {
            label: '查看全部',
            value: 0
          }, {
            label: '仅查看分享',
            value: 1
          }, {
            label: '仅查看题解',
            value: 2
          }
        ]
      },
      buttonList: [
        {
          name: '审核',
          type: 'primary',
          fc: (row) => {
            let flags = {
              bool: row.status === '通过',
              data: row.status === '通过' ? 2 : 1
            }
            this.$confirm('该分享将被' + (flags.bool ? '取消审核通过' : '审核通过') + ', 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let reqData = ({
                id: this.tableData.find((obj) => { return obj.id === row.id }).sid,
                status: flags.data
              })
              api.slogReview(reqData).then(res => {
                if (res.data.code === 201 || res.data.code === 200) {
                  if (flags.bool) row.status = '未通过'
                  else row.status = '通过'
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
            api.slogInf(({
              id: this.tableData.find((obj) => { return obj.id === row.id }).sid
            })).then(res => {
              if (res.data.code === 201 || res.data.code === 200) {
                let inf = {
                  title: res.data.data.title,
                  details: [
                    {
                      label: '发布时间',
                      value: new Date(res.data.data.publishDatetime).format('Y-m-d H:i:s')
                    }, {
                      label: '作者',
                      value: res.data.data.author
                    }
                  ],
                  content: res.data.data.content
                }
                if (res.data.data.correspondingId && res.data.data.correspondingId !== 'null' && res.data.data.correspondingId !=='') {
                  inf.details.push({
                    label: '问题题目',
                    value: res.data.data.correspondingId
                  })
                  inf.details.push({
                    label: '类型',
                    value: '题解'
                  })
                } else {
                  inf.details.push({
                    label: '类型',
                    value: '分享'
                  })
                }
                this.$store.commit('selectTab', [{'label': '分享管理'}, {'label': '查看分享'}])
                this.$store.commit('storeObj', inf)
                this.$router.push({ name: 'adminSlogInf' })
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
        // {
        //   name: '修改',
        //   type: 'warning',
        //   fc: (row) => {
        //     api.slogInf(({
        //       id: this.tableData.find((obj) => { return obj.id === row.id }).sid
        //     })).then(res => {
        //       if (res.data.code === 201 || res.data.code === 200) {
        //         this.$store.commit('selectTab', [{'label': '分享管理'}, {'label': '修改分享'}])
        //         this.$store.commit('storeObj', res.data.data)
        //         this.$router.push({ name: 'adminSlogUpdate' })
        //       } else {
        //         this.$message.error({
        //           message: res.data.message
        //         })
        //       }
        //     }).catch(error => {
        //       console.log(error)
        //     })
        //   }
        // },
        {
          name: '删除',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该分享将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.slogDelete(({
                id: this.tableData.find((obj) => { return obj.id === row.id }).sid
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
      tableData: [
        {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }, {
          id: '1',
          title: '空',
          author: '空',
          type: '空',
          status: '空',
          sid: null
        }
      ],
      tableLabel: [
        {
          prop: 'id',
          label: 'Id',
          width: 50
        }, {
          prop: 'title',
          label: '题目',
          width: 250
        }, {
          prop: 'author',
          label: '作者'
        }, {
          prop: 'type',
          label: '类型'
        }, {
          prop: 'status',
          label: '状态'
        }
      ]
    }
  },
  methods: {
    changePage () {
      this.thisPage(this.config.current, this.config.type)
    },
    thisPage (val1, val2) {
      console.log('page changed')
      api.slogList({
        page: (val1 - 1) * this.config.size,
        type: val2
      }).then(res => {
        // console.log(res)
        if (res.data.code === 201 || res.data.code === 200) {
          this.config.current = res.data.data.current
          this.config.total = res.data.data.totalPage * res.data.data.size
          this.config.size = res.data.data.size
          this.tableData = []
          if (res.data.data.listFromPage) {
            res.data.data.listFromPage.forEach((element, index) => {
              let slog = {
                sid: element.id,
                id: (res.data.data.current - 1) * res.data.data.size + index + 1,
                title: element.title,
                author: element.author
              }
              console.log(element.correspondingId)
              if (!element.correspondingId || element.correspondingId === 'null' || element.correspondingId === '')
                slog.type = '分享'
              else slog.type = '题解'
              switch (element.status) {
                case 0:
                  slog.status = '未审核'
                  break
                case 1:
                  slog.status = '通过'
                  break
                case 2:
                  slog.status = '未通过'
                  break
                case 3:
                  slog.status = '草稿'
                  break
                case -1:
                  slog.status = '删除'
                  break
                default:
                  slog.status = '未审核'
              }
              this.tableData.push(slog)
            })
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
  },
  mounted () {
    this.thisPage(this.config.current, this.config.type)
  }
}
</script>

<style lang="less" scoped>
.slog {
  margin: 20px;
}
#rbt-box {
  span {
    margin-right: 20px;
    margin-left: 10px;
  }
  .el-select {
    width: 120px
  }
}
</style>
