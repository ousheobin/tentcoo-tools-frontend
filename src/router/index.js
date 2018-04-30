import Vue from 'vue'
import Router from 'vue-router'
import WelcomePage from '@/page/WelcomePage'
import WeeklyPage from '@/page/WeeklyPage'
import AddWeeklyPage from '@/page/AddWeeklyPage'
import AddActivity from '@/page/AddActivity'
import Attendance from '@/page/Attendance'
import Birthday from '@/page/Birthday'
import UploadAttendace from '@/page/UploadAttendance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    }, {
      path: '/weekly',
      name: 'Weekly',
      component: WeeklyPage
    }, {
      path: '/add-weekly',
      name: 'AddWeekly',
      component: AddWeeklyPage
    }, {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance
    }, {
      path: '/birthday',
      name: 'Birthday',
      component: Birthday
    }, {
      path: '/exmail',
      name: 'WelcomePage',
      component: WelcomePage
    }, {
      path: '/tower',
      name: 'TowerPage',
      component: WelcomePage
    }, {
      path: '/mgr-notice',
      name: 'AddActivity',
      component: AddActivity
    }, {
      path: '/mgr-attendance',
      name: 'UploadAttendace',
      component: UploadAttendace
    }
  ]
})
