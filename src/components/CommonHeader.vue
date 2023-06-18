<template>
  <header>
    <div class="left-content">
      <el-button @click="collapseMenu()" plain :icon="collapseIcon" size="mini"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tabs" :key="item.label">
          <span class="breadcrumb-span">{{item.label}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="hover" size="mini">
        <span>
          <el-avatar :src="managerImg"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="gotoMain()">回到用户主页</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLogin()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      managerImg: require('../assets/images/logo.png')
    }
  },
  methods: {
    collapseMenu () {
      this.$store.commit('collapseMenu')
    },
    gotoMain () {
      this.$router.push({ name: 'main' })
    },
    gotoLogin () {
      window.sessionStorage.clear()
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    collapseIcon () {
      return this.$store.state.tab.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    ...mapState({
      tabs: state => state.tab.tabList
    })
  }
}
</script>

<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  .breadcrumb-span {
    color: white;
  }
}
</style>
