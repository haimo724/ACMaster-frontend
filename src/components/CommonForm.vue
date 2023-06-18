<template>
  <div><el-form ref="form" :rules="rules" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input
          v-if="item.type === 'input'"
          :placeholder="'请输入' + item.label"
          v-model="form[item.model]"
      ></el-input>
      <el-input
          v-if="item.type === 'textarea'"
          :placeholder="'请输入' + item.label"
          type="textarea"
          autosize
          v-model="form[item.model]"
      ></el-input>
      <el-switch
          v-if="item.type === 'switch'"
          v-model="form[item.model]"
          active-color="#13ce66"
          inactive-color="#ff4949"
      ></el-switch>
      <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="form[item.model]"
      ></el-date-picker>
      <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="form[item.model]"
      >
          <el-option
          v-for="item2 in item.opts"
          :key="item2.value"
          :label="item2.label"
          :value="item2.value"
          ></el-option>
      </el-select>
      <el-cascader
          v-if="item.type === 'select2'"
          :options="item.opts"
          :props="{ checkStrictly: true }"
          clearable
          v-model="form[item.model]"
      ></el-cascader>
      <template
        v-if="item.type === 'taginput'"
      >
        <el-input
          placeholder="请输入tag"
          v-model="tagName"
          style="width: 300px;"
        ></el-input>
        <el-button @click="addTag(form[item.model])" style="margin-left: 20px;">添加tag</el-button>
        <div style="margin-top: 10px;">
          <span v-for="tag in form[item.model]" :key="tag" style="margin: 5px;">
            <el-tag closable @close="handleClose(tag, form[item.model])">{{tag}}</el-tag>
          </span>
        </div>
      </template>
    </el-form-item>
  </el-form></div>
</template>

<script>
export default {
  name: 'CommonForm',
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
    rules: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      tagName: ''
    }
  },
  methods: {
    handleClose(tag, arr) {
      arr.splice(arr.indexOf(tag), 1);
    },
    addTag (arr) {
      arr.push(this.tagName)
      this.tagName = ''
    }
  }
}
</script>

<style scoped>

</style>
