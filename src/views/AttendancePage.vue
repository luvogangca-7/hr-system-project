<template>
  <div style="padding: 20px;">
    <h1>Company Attendance</h1>
    <AttendanceComp
      :records="attendanceRecords"
      @delete-record="handleDelete"
    />
  </div>
</template>

<script>
import AttendanceComp from '../components/AttendanceComp.vue';

export default {
  name: "Attendance",
  components: {
    AttendanceComp
  },
  data() {
    return {
      attendanceRecords: []
    };
  },
  async mounted() {
    try {
      const response = await fetch('/hr-data/attendance.json');
      const data = await response.json();
      this.attendanceRecords = data.attendanceAndLeave.flatMap(emp =>
        emp.attendance.map(a => ({
          employee: emp.name,
          date: a.date,
          status: a.status
        }))
      );
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    }
  },
  methods: {
    handleDelete(index) {
      this.attendanceRecords.splice(index, 1);
    }
  }
}
</script>