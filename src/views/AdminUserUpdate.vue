<template>
  <div class="new-user">
      <new-item-form
        :formLabel="formFormat"
        :form="operateForm"
        :formTitle="formTitle"
        :inline="true"
        :confirm="confirm"
        ref="form"
      ></new-item-form>
  </div>
</template>

<script>
import NewItemForm from '@/components/NewItemForm'
import api from '../../api/data.js'
export default {
  name: 'NewUser',
  data () {
    return {
      formTitle: '添加新用户',
      operateForm: {
        passHash: '',
        schoolId: '',
        userName: '',
        phone: '',
        checkPass: '',
        email: '',
        school: {},
        role: 1,
        status: 1
      },
      formFormat: [
        {
          model: 'userName',
          label: '用户名',
          type: 'input'
        },
        {
          model: 'passHash',
          label: '密码',
          type: 'input'
        },
        {
          model: 'checkPass',
          label: '确认密码',
          type: 'input'
        },
        {
          model: 'status',
          label: '状态',
          type: 'select',
          opts: [
            {
              label: '现役',
              value: 1
            }, {
              label: '退役',
              value: 0
            }
          ]
        },
        {
          model: 'email',
          label: '邮箱',
          type: 'input'
        },
        {
          model: 'role',
          label: '角色',
          type: 'select',
          opts: [
            {
              label: '普通用户',
              value: 1
            }, {
              label: '分队队长',
              value: 2
            }, {
              label: '基地队长',
              value: 3
            }, {
              label: '指导教师',
              value: 4
            }, {
              label: '超级管理员',
              value: 5
            }
          ]
        },
        {
          model: 'phone',
          label: '手机号',
          type: 'input'
        },
        {
          model: 'school',
          label: '学院/专业',
          type: 'select2',
          opts: [{
            value: '软件学院',
            label: '软件学院',
            children: [{
              value: '软件工程',
              label: '软件工程'
            }]
          }, {
            value: '计算机学院',
            label: '计算机学院',
            children: [{
              value: '计算机科学与技术',
              label: '计算机科学与技术'
            }, {
              value: '物联网',
              label: '物联网'
            }, {
              value: '大数据',
              label: '大数据'
            }]
          }]
        }
      ]
    }
  },
  components: {
    NewItemForm
  },
  methods: {
    confirm (form) {
      if (this.formTitle === '修改用户信息') {
        form = Object.assign(form, {college: form.school[0], major: form.school[1]})
        api.userUpdate((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [{'label': '用户管理'}, {'label': '全部用户'}])
            this.$router.push({ name: 'adminUser' })
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        }).catch(error => {
          console.log(error)
        })
      } else if (this.formTitle === '添加新用户') {
        form = Object.assign(form, {college: form.school[0], major: form.school[1]})
        api.userAdd((form)).then(res => {
          if (res.data.code === 201 || res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '完成'
            })
            this.$store.commit('selectTab', [{'label': '用户管理'}, {'label': '全部用户'}])
            this.$router.push({ name: 'adminUser' })
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
      this.formTitle = '修改用户信息'
      this.operateForm.schoolId = this.$store.state.tab.tempObj.schoolId
      this.operateForm.userName = this.$store.state.tab.tempObj.userName
      this.operateForm.phone = this.$store.state.tab.tempObj.phone
      this.operateForm.email = this.$store.state.tab.tempObj.email
      this.operateForm.school = [this.$store.state.tab.tempObj.college, this.$store.state.tab.tempObj.major]
      this.operateForm.role = this.$store.state.tab.tempObj.role
      this.operateForm.status = this.$store.state.tab.tempObj.status
    } else {
      this.formFormat.push({
        model: 'schoolId',
        label: '学号',
        type: 'input'
      })
    }
  }
}
</script>

<style scoped>
.new-user {
  margin: 20px;
}
</style>
