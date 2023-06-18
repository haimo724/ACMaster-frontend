<template>
  <div class="slog">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
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
  name: 'AdminComment',
  components: {
    CommonTable
  },
  data () {
    return {
      config: {
        current: 1,
        total: 100,
        size: 10,
        type: -1,
        options: [
          {
            label: '查看全部',
            value: -1
          },
          // {
          //   label: '仅查看公告评论',
          //   value: 1
          // }, {
          //   label: '仅查看新闻评论',
          //   value: 2
          // }, {
          //   label: '仅查看活动评论',
          //   value: 3
          // }, 
          {
            label: '仅查看分享评论',
            value: 4
          }, {
            label: '仅查看题解评论',
            value: 5
          }
        ]
      },
      buttonList: [
        {
          name: '删除',
          type: 'danger',
          fc: (row) => {
            this.$confirm('该评论将被删除, 你确定吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.commentDelete(({
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
      ],
      tableData: [
        {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }, {
          id: null,
          content: '空',
          type: '空',
          commentDatetime: '空',
          authorId: '空',
          tid: 0
        }
      ],
      tableLabel: [
        {
          prop: 'tid',
          label: 'Id',
          width: 50
        }, {
          prop: 'content',
          label: '评论内容',
          width: 500
        }, {
          prop: 'type',
          label: '类型'
        }, {
          prop: 'authorId',
          label: '作者'
        }, {
          prop: 'commentDatetime',
          label: '发布时间'
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
      api.commentList({
        page: (val1 - 1) * this.config.size,
        type: val2
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
              content: element.content,
              type: element.originId,
              authorId: element.authorId,
              commentDatetime: new Date(element.commentDatetime).format('Y-m-d')
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
