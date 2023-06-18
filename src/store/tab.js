export default {
  state: {
    isCollapse: false,
    tabList: [
      {
        path: '/home',
        name: 'home',
        label: '首页'
      }
    ],
    tempObj: {},
    isUpdate: false,
    managerId: 3
  },
  mutations: {
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    selectTab (state, val) {
      state.tabList = val
      // if (val.name !== 'home') {
      //   const result = state.tabList.findIndex(item => item.name === val.name)
      //   if (result === -1) {
      //     state.tabList.push(val)
      //   }
      // } else {
      //   state.currentTab = {
      //     path: '/home',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   }
      // }
    },
    storeObj (state, val) {
      state.tempObj = val
      state.isUpdate = true
    },
    updated (state) {
      state.isUpdate = false
    },
    setManager (state, val) {
      state.managerId = val
    }
  }
}
