<template>
  <div class="admin-slog-update">
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
  name: 'AdminSlogUpdate',
  data () {
    return {
      formTitle: '新建分享',
      operateForm: {
        title: '',
        content: '',
        correspondingTitle: '',
        id: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
        ],
        correspondingTitle: [
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      },
      formFormat: [
        {
          model: 'title',
          label: '标题',
          type: 'input'
        },
        {
          model: 'correspondingTitle',
          label: '相关题目标题',
          type: 'input'
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
      if (this.formTitle === '修改分享') {
        api.slogUpdate((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [{'label': '分享管理'}])
            this.$router.push({ name: 'adminSlog' })
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
      this.formTitle = '修改分享'
      this.operateForm.id = this.$store.state.tab.tempObj.id
      this.operateForm.title = this.$store.state.tab.tempObj.title
      this.operateForm.correspondingTitle = this.$store.state.tab.tempObj.correspondingTitle
      this.operateForm.content = this.$store.state.tab.tempObj.content
    }
  }
}
</script>

<style lang="less" scoped>
.admin-slog-update {
  margin: 20px;
}
</style>
