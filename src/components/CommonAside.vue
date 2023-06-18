  <template>
  <div class="common-aside">

    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="isUniqueOpened">
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.label">
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
            <el-menu-item @click="clickMenu(subitem, item)" :index="subitem.path">
              <i :class="'el-icon-' + subitem.icon"></i>
              <span slot="title">{{subitem.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'CommonAside',
  data () {
    return {
      isUniqueOpened: true,
      menu: [
        {
          path: '/adminHome',
          name: 'adminHome',
          label: '首页',
          icon: 's-home'
        },
        {
          path: '/adminSlog',
          name: 'adminSlog',
          label: '分享管理',
          icon: 'postcard'
        },
        {
          path: '/adminMesboard',
          name: 'adminMesboard',
          label: '留言板管理',
          icon: 'chat-line-square'
        },
        {
          path: '/adminComment',
          name: 'adminComment',
          label: '评论管理',
          icon: 'chat-dot-square'
        },
        {
          label: '公告管理',
          icon: 'tickets',
          children: [
            {
              path: '/adminArticleUpdate',
              name: 'adminArticleUpdate',
              label: '新建公告',
              icon: 'plus'
            },
            {
              path: '/adminArticle',
              name: 'adminArticle',
              label: '全部公告',
              icon: 'document-copy'
            }
          ]
        },
        {
          label: '用户管理',
          icon: 'user',
          children: [
            {
              path: '/adminUserUpdate',
              name: 'adminUserUpdate',
              label: '新建用户',
              icon: 'plus'
            },
            {
              path: '/adminUser',
              name: 'adminUser',
              label: '全部用户',
              icon: 'user'
            }
          ]
        },
        {
          label: '分队管理',
          icon: 'attract',
          children: [
            {
              path: '/adminTeamAdd',
              name: 'adminTeamAdd',
              label: '新建分队',
              icon: 'plus'
            },
            {
              path: '/adminTeam',
              name: 'adminTeam',
              label: '全部分队',
              icon: 'attract'
            }
          ]
        },
        {
          label: '题目管理',
          icon: 'files',
          children: [
            {
              path: '/adminQuestionAdd',
              name: 'adminQuestionAdd',
              label: '新建题目',
              icon: 'plus'
            },
            {
              path: '/adminQuestion',
              name: 'adminQuestion',
              label: '全部题目',
              icon: 'files'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu (item, fitem) {
      this.$router.push(
        {
          name: item.name
        }
      )
      location.reload()
      if (fitem) {
        this.$store.commit('selectTab', [{'label': fitem.label}, item])
      } else {
        this.$store.commit('selectTab', [item])
      }
    }
  },
  computed: {
    noChildren () {
      return this.menu.filter(item => !item.children)
    },
    hasChildren () {
      return this.menu.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style scoped>
.common-aside {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
