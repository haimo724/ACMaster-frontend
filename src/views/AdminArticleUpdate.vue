<template>
  <div class="admin-article-update">
    <new-item-form
      :formLabel="formFormat"
      :form="operateForm"
      :formTitle="formTitle"
      :inline="false"
      :confirm="confirm"
      :rules="rules"
      ref="form"
    ></new-item-form>
  </div>
</template>

<script>
import api from '../../api/data.js'
import NewItemForm from '@/components/NewItemForm'
export default {
  name: 'AdminArticleUpdate',
  data () {
    return {
      formTitle: '新建公告',
      operateForm: {
        id: 1,
        title: '',
        content: '',
        type: 1,
        articleAbstract: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 0 到 15 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 0 到 1000 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],
        articleAbstract: [
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      formFormat: [
        {
          model: 'title',
          label: '标题',
          type: 'input'
        },
        {
          model: 'type',
          label: '类型',
          type: 'select',
          opts: [
            {
              label: '新闻',
              value: 1
            }, {
              label: '活动',
              value: 2
            }, {
              label: '公告',
              value: 3
            }
          ]
        },
        {
          model: 'articleAbstract',
          label: '摘要',
          type: 'textarea'
        },
        {
          model: 'content',
          label: '正文',
          type: 'textarea'
        }
      ]
    }
  },
  components: {
    NewItemForm
  },
  methods: {
    confirm (form) {
      if (this.formTitle === '修改公告') {
        api.articleUpdate((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [{'label': '公告管理'}, {'label': '全部公告'}])
            this.$router.push({ name: 'adminArticle' })
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        }).catch(error => {
          console.log(error)
        })
      } else if (this.formTitle === '新建公告') {
        delete form.id
        form.authorId = sessionStorage.getItem('userId')
        api.articleAdd((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [{'label': '公告管理'}, {'label': '全部公告'}])
            this.$router.push({ name: 'adminArticle' })
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
  },
  mounted () {
    if (this.$store.state.tab.isUpdate) {
      this.$store.commit('updated')
      this.formTitle = '修改公告'
      this.operateForm.id = this.$store.state.tab.tempObj.id
      this.operateForm.title = this.$store.state.tab.tempObj.title
      this.operateForm.correspondingTitle = this.$store.state.tab.tempObj.correspondingTitle
      this.operateForm.content = this.$store.state.tab.tempObj.content
    }
  }
}
</script>

<style scoped>
.admin-article-update {
  margin: 20px;
}
</style>
