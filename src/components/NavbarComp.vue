<template>
  <aside class="sidebar" v-if="hideDash">
    <nav>
      <router-link :to="$store.state.isAdmin? '/admin/dashboard' : '/staff/mydashboard'">{{$store.state.isAdmin? 'Dashboard' : 'My Dashboard'}}</router-link>
      <router-link :to="$store.state.isAdmin? '/admin/employees' : '/staff/myprofile'">{{$store.state.isAdmin? 'Employees' : 'My Profile'}}</router-link>
      <router-link :to="$store.state.isAdmin? '/admin/attendance' : '/staff/myattendance'">{{$store.state.isAdmin? 'Attendance' : 'My Attendance'}}</router-link>
      <router-link :to="$store.state.isAdmin? '/admin/payroll' : '/staff/mypayroll'">{{$store.state.isAdmin? 'Payroll' : 'My Payroll'}}</router-link>
      <router-link :to="$store.state.isAdmin? '/admin/leave' : '/staff/myleave'">{{$store.state.isAdmin? 'Leave' : 'My Leave'}}</router-link>
      <router-link :to="$store.state.isAdmin? '/admin/performance' : '/staff/myperformance'">{{$store.state.isAdmin? 'Performance Review' : 'My Performance Review'}}</router-link>
    </nav>
    <slot name="after-nav"></slot>
  </aside>
</template>

<script>
export default {
    props: {
    hideDash: {
      type: Boolean,
      default: true
    }
  }
}
</script>