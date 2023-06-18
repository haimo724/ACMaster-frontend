<template>
  <div class="article">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新闻\公告\活动 管理</span>
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
  name: 'AdminArticle',
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
            label: '仅查看新闻',
            value: 1
          }, {
            label: '仅查看活动',
            value: 2
          }, {
            label: '仅查看公告',
            value: 3
          }
        ]
      },
      buttonList: [
        {
          name: '置顶/取消',
          type: 'primary',
          fc: (row) => {
            let flags = {
              bool: row.status === '置顶',
              data: row.status === '置顶' ? 0 : 1
            }
            this.$confirm('该文章将被' + (flags.bool ? '取消置顶' : '置顶') + ', 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.articleTop(({
                id: this.tableData.find((obj) => { return obj.id === row.id }).aid,
                isTop: flags.data
              })).then(res => {
                if (res.data.code === 201 || res.data.code === 200) {
                  this.changePage()
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
            api.articleInf(({
              id: this.tableData.find((obj) => { return obj.id === row.id }).aid
            })).then(res => {
              if (res.data.code === 201 || res.data.code === 200) {
                this.$store.commit('selectTab', [{'label': '公告管理'}, {'label': '全部公告'}, {'label': '查看公告'}])
                this.$store.commit('storeObj', res.data.data)
                this.$router.push({ name: 'adminArticleInf' })
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
            api.articleInf(({
              id: this.tableData.find((obj) => { return obj.id === row.id }).aid
            })).then(res => {
              if (res.data.code === 201 || res.data.code === 200) {
                this.$store.commit('selectTab', [{'label': '公告管理'}, {'label': '全部公告'}, {'label': '修改公告'}])
                this.$store.commit('storeObj', res.data.data)
                this.$router.push({ name: 'adminArticleUpdate' })
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
              api.articleDelete(({
                id: this.tableData.find((obj) => { return obj.id === row.id }).aid
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
          title: '关于ACM基地搬迁的通知',
          author: '2019303030',
          type: '通知'
        }, {
          id: '1',
          title: '关于ACM基地搬迁的通知',
          author: '2019303030',
          type: '通知'
        }, {
          id: '1',
          title: '关于ACM基地搬迁的通知',
          author: '2019303030',
          type: '通知'
        }, {
          id: '1',
          title: '关于ACM基地搬迁的通知',
          author: '2019303030',
          type: '通知'
        }, {
          id: '1',
          title: '关于ACM基地搬迁的通知',
          author: '2019303030',
          type: '通知'
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
          width: 150
        }, {
          prop: 'author',
          label: '作者'
        }, {
          prop: 'type',
          label: '类型'
        }, {
          prop: 'status',
          label: '状态'
        }, {
          prop: 'status2',
          label: '删除'
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
      api.articleList({
        page: (val1 - 1) * this.config.size,
        type: val2
      }).then(res => {
        if (res.data.code === 201 || res.data.code === 200) {
          this.tableData = []
          if (res.data.data) {
            this.config.current = res.data.data.current
            this.config.total = res.data.data.totalPage * res.data.data.size
            this.config.size = res.data.data.size
            res.data.data.listFromPage.forEach((element, index) => {
              let item = {
                aid: element.id,
                id: (res.data.data.current - 1) * res.data.data.size + index + 1,
                title: element.title,
                author: element.authorId
              }
              switch (element.type) {
                case 1:
                  item.type = '新闻'
                  break
                case 2:
                  item.type = '活动'
                  break
                case 3:
                  item.type = '公告'
                  break
                default:
                  item.type = '未知'
              }
              if (element.isTop) item.status = '置顶'
              else item.status = '未置顶'
              if (element.status) item.status2 = '存在'
              else item.status2 = '删除'
              this.tableData.push(item)
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
.article {
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
