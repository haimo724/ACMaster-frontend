import VueRouter from 'vue-router'

let Main = () => import('../views/Main-asa.vue')
let Slog = () => import('../views/Slog-asa.vue')
let Login = () => import('../views/Login-asa.vue')
let Register = () => import('../views/Register-asa.vue')
let AdminLogin = () => import('../views/AdminLogin.vue')
let NewsList = () => import('../views/NewsList.vue')
let NewsDetail = () => import('../views/NewsDetail.vue')
let MessageList = () => import('../views/MessageList.vue')
let SlogDetail = () => import('../views/SlogDetail.vue')
let AddSlog = () => import('../views/AddSlog.vue')
let InfoCenter = () => import('../views/InfoCenter.vue')
let SelfInfo = () => import('../components/SelfInfo.vue')
let SelfSlog = () => import('../components/SelfSlog.vue')
let TeamList = () => import('../views/TeamList.vue')
let Empty = () => import('../components/InfoEmpty.vue')
let Draft = () => import('../components/SelfDraft.vue')
let TimeLine = () => import('../components/TimeLine.vue')
let UpdateSlog = () => import('../views/UpdateSlog.vue')
let ProblemList = () => import('../views/ProblemList.vue')
let ProblemDetail = () => import('../views/ProblemDetail.vue')
let ProblemSubmission = () => import('../views/ProblemSubmission.vue')
let SelfCode = () => import('../components/SelfCode.vue')
let GlobalSearch = () => import('../views/GlobalSearch.vue')
let SolutionList = () => import('../views/SolutionList.vue')
let QRCode = ()=> import('../views/QRCode.vue')
let ChangePic = () => import('../components/ChangePic.vue')
let NF404 = () => import('../views/NF404.vue')

import AdminMain from '@/views/AdminMain'
import AdminHome from '@/views/AdminHome'
import AdminSlog from '@/views/AdminSlog'
import AdminSlogInf from '@/views/AdminSlogInf'
import AdminSlogUpdate from '@/views/AdminSlogUpdate'
import AdminArticle from '@/views/AdminArticle'
import AdminArticleInf from '@/views/AdminArticleInf'
import AdminArticleUpdate from '@/views/AdminArticleUpdate'
import AdminUser from '@/views/AdminUser'
import AdminUserInf from '@/views/AdminUserInf'
import AdminUserUpdate from '@/views/AdminUserUpdate'
import AdminTeam from '@/views/AdminTeam'
import AdminTeamAdduser from '@/views/AdminTeamAdduser'
import AdminTeamDeluser from '@/views/AdminTeamDeluser'
import AdminTeamAdd from '@/views/AdminTeamAdd'
import AdminTeamUpdate from '@/views/AdminTeamUpdate'
import AdminQuestion from '@/views/AdminQuestion'
import AdminQuestionInf from '@/views/AdminQuestionInf'
import AdminQuestionUpdate from '@/views/AdminQuestionUpdate'
import AdminQuestionAdd from '@/views/AdminQuestionAdd'
import AdminComment from '@/views/AdminComment'
import AdminMesboard from '@/views/AdminMesboard'

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/register',
            name:'register',
            component:Register
        },
        {
          path:'/404',
          name:'404',
          component:NF404
        },
        {
            path:'/main',
            name:'main',
            component:Main
        },
        {
            path:'/Slog',
            name:'slog',
            component:Slog
        },
        {
            path:'/solutionlist',
            name:'slog',
            component:SolutionList
        },
        {
            path:'/adminlogin',
            name:'adminlogin',
            component:AdminLogin
        },{
            path:'/newslist',
            name:'newslist',
            component:NewsList
        },
        {
            path:'/newsdetail',
            name:'newslist',
            component:NewsDetail
        },
        {
            path:'/problemlist',
            name:'problemlist',
            component:ProblemList
        },
        {
            path:'/problemdetail',
            name:'problemlist',
            component:ProblemDetail  
        },
        {
            path:'/problemsubmission',
            name:'problemlist',
            component: ProblemSubmission
        },
        {
            path:'/messagelist',
            name:'messagelist',
            component:MessageList
        },
        {
            path:'/slogdetail',
            name:'slog',
            component:SlogDetail
        },
        {
            path:'/addslog',
            name:'slog',
            component:AddSlog
        },
        {
            path:'/updateslog',
            name:'updateslog',
            component:UpdateSlog
        },
        {
            path:'/teamlist',
            name:'teamlist',
            component:TeamList
        },
        {
            path:'/globalsearch',
            name:'globalsearch',
            component:GlobalSearch
        },
        {
            path:'/qrcode', 
            name:'qrcode',
            component:QRCode
        },
        {
            path:'/info',
            name:'info',
            redirect:'/info/empty',
            component:InfoCenter,
            children:[
                {
                    path:'selfinfo',
                    name:'selfinfo',
                    component:SelfInfo
                },
                {
                    path:'selfslog',
                    name:'selfslog',
                    component:SelfSlog
                },
                {
                    path:'changepic',
                    name:'changepic',
                    component:ChangePic
                },
                {
                    path:'selfcode',
                    name:'selfcode',
                    component:SelfCode
                },
                {
                    path:'empty',
                    name:'empty',
                    component:Empty
                },
                {
                    path:'draft',
                    name:'draft',
                    component:Draft
                },
                {
                    path:'timeline',
                    name:'timeline',
                    component:TimeLine
                }
            ]
        },
        {
            path: '/adminMain',
            name: 'adminMain',
            redirect: '/adminHome',
            component: AdminMain,
            children: [
              {
                path: '/adminHome',
                name: 'adminHome',
                component: AdminHome
              },
              {
                path: '/adminSlog',
                name: 'adminSlog',
                component: AdminSlog
              },
              {
                path: '/adminSlogInf',
                name: 'adminSlogInf',
                component: AdminSlogInf
              },
              {
                path: '/adminSlogUpdate',
                name: 'adminSlogUpdate',
                component: AdminSlogUpdate
              },
              {
                path: '/adminArticle',
                name: 'adminArticle',
                component: AdminArticle
              },
              {
                path: '/adminArticleUpdate',
                name: 'adminArticleUpdate',
                component: AdminArticleUpdate
              },
              {
                path: '/adminArticleInf',
                name: 'adminArticleInf',
                component: AdminArticleInf
              },
              {
                path: '/adminUser',
                name: 'adminUser',
                component: AdminUser
              },
              {
                path: '/adminUserInf',
                name: 'adminUserInf',
                component: AdminUserInf
              },
              {
                path: '/adminUserUpdate',
                name: 'adminUserUpdate',
                component: AdminUserUpdate
              },
              {
                path: '/adminTeam',
                name: 'adminTeam',
                component: AdminTeam
              },
              {
                path: '/adminTeamAdduser',
                name: 'adminTeamAdduser',
                component: AdminTeamAdduser
              },
              {
                path: '/adminTeamDeluser',
                name: 'adminTeamDeluser',
                component: AdminTeamDeluser
              },
              {
                path: '/adminTeamAdd',
                name: 'adminTeamAdd',
                component: AdminTeamAdd
              },
              {
                path: '/adminTeamUpdate',
                name: 'adminTeamUpdate',
                component: AdminTeamUpdate
              },
              {
                path: '/adminQuestion',
                name: 'adminQuestion',
                component: AdminQuestion
              },
              {
                path: '/adminQuestionInf',
                name: 'adminQuestionInf',
                component: AdminQuestionInf
              },
              {
                path: '/adminQuestionAdd',
                name: 'adminQuestionAdd',
                component: AdminQuestionAdd
              },
              {
                path: '/adminQuestionUpdate',
                name: 'adminQuestionUpdate',
                component: AdminQuestionUpdate
              },
              {
                path: '/adminComment',
                name: 'adminComment',
                component: AdminComment
              },
              {
                path: '/adminMesboard',
                name: 'adminMesboard',
                component: AdminMesboard
              }
            ]
        }
    ]
})

// router.beforeEach((to, form, next) => {
//   const token = window.sessionStorage.getItem('role')
//   if ((to.path === '/' || to.path === '/login') && (!token)) {
//     next()
//   } else if (!token) {
//     next('/login')
//   } else if (to.name.match(/^admin.*/)) {
//     const numRole = Number.parseInt(token)
//     if (numRole < 2) next('/main')
//     else next()
//   } else {
//     next()
//   }
// })

export default router

