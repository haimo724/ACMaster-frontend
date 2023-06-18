<template>
  <div class="new-question">
      <new-item-form
        :formLabel="formFormat"
        :form="operateForm"
        :formTitle="formTitle"
        :inline="false"
        :confirm="confirm"
        ref="form"
      ></new-item-form>
  </div>
</template>

<script>
import api from '../../api/data.js'
import NewItemForm from '@/components/NewItemForm'
export default {
  name: 'NewQuestion',
  data () {
    return {
      formTitle: '新建题目',
      operateForm: {
        displayId: '',
        title: '',
        description: '',
        inputDescription: '',
        outputDescription: '',
        inputExample: '',
        outputExample: '',
        timeLimit: '',
        memoryLimit: '',
        rank: 1,
        status: 1,
        hint: '',
        ioType: 1,
        testPath: '',
        origin: '',
        authorId: 3,
        tagList: []
      },
      formFormat: [
        {
          model: 'displayId',
          label: 'id',
          type: 'input'
        },
        {
          model: 'title',
          label: '标题',
          type: 'input'
        },
        {
          model: 'description',
          label: '描述',
          type: 'textarea'
        },
        {
          model: 'inputDescription',
          label: '输入描述',
          type: 'textarea'
        },
        {
          model: 'outputDescription',
          label: '输出描述',
          type: 'textarea'
        },
        {
          model: 'inputExample',
          label: '输入样例(json)',
          type: 'textarea'
        },
        {
          model: 'outputExample',
          label: '输出样例(json)',
          type: 'textarea'
        },
        {
          model: 'timeLimit',
          label: '时间限制(ms)',
          type: 'input'
        },
        {
          model: 'memoryLimit',
          label: '内存限制(kb)',
          type: 'input'
        },
        {
          model: 'rank',
          label: '难度',
          type: 'select',
          opts: [
            {
              label: '低',
              value: 1
            }, {
              label: '中',
              value: 2
            }, {
              label: '高',
              value: 3
            }
          ]
        },
        {
          model: 'status',
          label: '状态',
          type: 'select',
          opts: [
            {
              label: '可见',
              value: 1
            }, {
              label: '不可见',
              value: 0
            }
          ]
        },
        {
          model: 'hint',
          label: '提示',
          type: 'input'
        },
        {
          model: 'ioType',
          label: 'io类型',
          type: 'select',
          opts: [
            {
              label: '标准',
              value: 1
            }, {
              label: '文件',
              value: 2
            }
          ]
        },
        {
          model: 'testPath',
          label: '测试路径',
          type: 'input'
        },
        {
          model: 'origin',
          label: '来源',
          type: 'input'
        },
        {
          model: 'tagList',
          label: 'tag',
          type: 'taginput'
        }
      ]
    }
  },
  components: {
    NewItemForm
  },
  mounted () {
    this.operateForm.authorId = this.$store.state.tab.managerId
  },
  methods: {
    confirm (form) {
      if (this.formTitle === '新建题目') {
        form.memoryLimit = Number.parseInt(form.memoryLimit)
        form.timeLimit = Number.parseInt(form.timeLimit)
        api.problemAdd((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [ {'label': '题目管理'}, {'label': '全部题目'} ])
            this.$router.push({ name: 'adminQuestion' })
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
}
</script>

<style scoped>
.new-question {
  margin: 20px;
}
</style>
