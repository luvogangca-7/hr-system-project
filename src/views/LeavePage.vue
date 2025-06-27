<template>
  <div class="page-wrapper">
    <h1>Leave Requests</h1>
    <p>Handle all your employees' leave requests with just a click.</p>
  <div class="main-page">
    <input
      v-model="search"
      type="text"
      placeholder="Search employee by name or reason"
      class="search-input"
    />
    <table class="table table-striped-columns table-responsive"v-if="filteredLeaveRequests.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Reason</th>
          <th>Status</th>
          <th v-if="isHR">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, idx) in filteredLeaveRequests" :key="idx">
          <td>{{ req.name }}</td>
          <td>{{ req.date }}</td>
          <td>{{ req.reason }}</td>
          <td>
            <span v-if="req.status === 'Pending' || req.status === 'pending'">Pending</span>
            <span v-else-if="req.status === 'Approved' || req.status === 'approved'" style="color:green">Approved</span>
            <span v-else style="color:red">Denied</span>
          </td>
          <td v-if="isHR">
            <div class="btn-cont">
            <button v-if="req.status === 'Pending' || req.status === 'pending'" @click="approve(idx)" class="btn btn-primary mx-2">Approve</button>
            <button v-if="req.status === 'Pending' || req.status === 'pending'" @click="deny(idx)" class="btn btn-danger mx-2">Deny</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No leave requests yet.</p>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLeaveRequests: [],
      isHR: true,
      search: ''
    }
  },
  computed: {
    filteredLeaveRequests() {
      if (!this.search) return this.allLeaveRequests;
      const q = this.search.toLowerCase();
      return this.allLeaveRequests.filter(
        req =>
          req.name.toLowerCase().includes(q) ||
          req.reason.toLowerCase().includes(q)
      );
    }
  },
  async mounted() {
    try {
      const response = await fetch('/hr-data/attendance.json');
      const attendanceData = await response.json();
      // Flatten the leave requests for all employees
      this.allLeaveRequests = attendanceData.attendanceAndLeave.flatMap(emp =>
        emp.leaveRequests.map(lr => ({
          name: emp.name,
          date: lr.date,
          reason: lr.reason,
          status: lr.status
        }))
      );
    } catch (error) {
      console.error('Failed to fetch leave data:', error);
    }
  },
  methods: {
    approve(idx) {
      const req = this.filteredLeaveRequests[idx];
      const realIdx = this.allLeaveRequests.findIndex(
        r =>
          r.name === req.name &&
          r.date === req.date &&
          r.reason === req.reason &&
          r.status === req.status
      );
      if (realIdx !== -1) this.allLeaveRequests[realIdx].status = 'Approved';
    },
    deny(idx) {
      const req = this.filteredLeaveRequests[idx];
      const realIdx = this.allLeaveRequests.findIndex(
        r =>
          r.name === req.name &&
          r.date === req.date &&
          r.reason === req.reason &&
          r.status === req.status
      );
      if (realIdx !== -1) this.allLeaveRequests[realIdx].status = 'Denied';
    }
  }
}
</script>

<style scoped>

.main-page h2 {
  margin-bottom: 16px;
}
.search-input {
  margin-bottom: 18px;
  padding: 8px 12px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
/* .main-page table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}
.main-page th, .main-page td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
} */
.main-page button {
  cursor: pointer;
}
.btn-cont {
  display: flex;
  justify-content: center;
}
</style>