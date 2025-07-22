<template>
  <aside class="sidebar" v-if="hideDash">
    <nav>
      <router-link to="/admin/dashboard">Dashboard</router-link>
      <router-link to="/admin/employees">Employees</router-link>
      <router-link to="/admin/attendance">Attendance</router-link>
      <router-link to="/admin/payroll">Payroll</router-link>
      <router-link to="/admin/leave">Leave</router-link>
      <router-link to="/admin/performance">Performance Review</router-link>
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