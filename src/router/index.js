import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import AttendancePage from '@/views/AttendancePage.vue'
import LeavePage from '@/views/LeavePage.vue'
import PayrollPage from '@/views/PayrollPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage
  },
  {
    path: '/employees',
    name: 'employees',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/EmployeesPage.vue')
    }
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendancePage
  },
  {
    path: '/leave',
    name: 'leave',
    component: LeavePage
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollPage
  },
  {
    path: '/',
    name: 'login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
