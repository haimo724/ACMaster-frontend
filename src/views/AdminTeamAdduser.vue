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
  name: 'TeamAdduser',
  data () {
    return {
      formTitle: '添加队员',
      operateForm: {
        schoolId: '',
        id: 0
      },
      rules: {
        schoolId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 9 个字符', trigger: 'blur' }
        ]
      },
      formFormat: [
        {
          model: 'schoolId',
          label: '队员学号',
          type: 'input'
        }
      ]
    }
  },
  components: {
    NewItemForm
  },
  mounted () {
    if (this.$store.state.tab.isUpdate) {
      this.$store.commit('updated')
      this.formTitle = '【' + this.$store.state.tab.tempObj.name + '】队 添加队员'
      this.operateForm.id = this.$store.state.tab.tempObj.id
    }
  },
  methods: {
    confirm (form) {
      api.teamAdduser((form)).then(res => {
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
</script>

<style scoped>
.new-team {
  margin: 20px;
}
</style>
