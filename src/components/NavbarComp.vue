<template>
    <aside  class="sidebar" v-if="hideDash">
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/employees">Employees</router-link>
        <router-link to="/attendance">Attendance</router-link>
        <router-link to="/payroll">Payroll</router-link>
        <router-link to="/leave">Leave</router-link>
        <router-link to="/performance">Performance Review</router-link>
      </nav>
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