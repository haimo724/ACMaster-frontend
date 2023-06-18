<template>
  <div class="new-team">
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
  name: 'NewTeam',
  data () {
    return {
      formTitle: '新建队伍',
      operateForm: {
        name: '',
        intro: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入队名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      },
      formFormat: [
        {
          model: 'name',
          label: '队伍名称',
          type: 'input'
        },
        {
          model: 'intro',
          label: '队伍介绍',
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
      if (this.formTitle === '新建队伍') {
        api.teamAdd((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [ {'label': '队伍管理'}, {'label': '全部队伍'} ])
            this.$router.push({ name: 'adminTeam' })
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
.new-team {
  margin: 20px;
}
</style>
