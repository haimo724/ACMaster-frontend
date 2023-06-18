<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.props"
        :label="item.label"
        :width="item.width ? item.width : 125"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-for="bt in buttonList"
            :key="bt.name"
            @click="bt.fc(scope.row)"
            :type="bt.type"
            :disable="disButton ? isBtdis(scope.row) : false"
          >
            {{bt.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagerbox">
      <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.current"
        @current-change="changePage()"
        :page-size="config.size"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableData: Array,
    tableLabel: Array,
    buttonList: Array,
    config: Object,
    changePage: Function,
    disButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    isBtdis (row) {
      return sessionStorage.getItem('userRank') < row.rank
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pagerbox {
    height: 50px;
    .pager {
      position: absolute;
      right: 34%;
      bottom: 0px;
    }
  }
}
</style>
