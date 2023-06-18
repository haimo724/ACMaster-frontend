<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{formTitle}}</span>
    </div>
    <common-form
      :formLabel="formLabel"
      :form="form"
      :inline="inline"
      ref="form"
    ></common-form>
    <el-divider></el-divider>
    <div class="card-footer">
      <el-button type="primary" @click="confirm(form)">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import CommonForm from '@/components/CommonForm'
export default {
  name: 'NewItemForm',
  components: {
    CommonForm
  },
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
    formTitle: String,
    confirm: Function
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
