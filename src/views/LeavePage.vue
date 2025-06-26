<template>
  <div class="leave-page">
    <h2>Current Leave Requests</h2>
    <input
      v-model="search"
      type="text"
      placeholder="Search by name or reason"
      class="search-input"
    />
    <table v-if="filteredLeaveRequests.length">
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
            <button v-if="req.status === 'Pending' || req.status === 'pending'" @click="approve(idx)">Approve</button>
            <button v-if="req.status === 'Pending' || req.status === 'pending'" @click="deny(idx)">Deny</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No leave requests yet.</p>
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

<style>
.leave-page {
  max-width: 700px;
  margin: 40px auto;
  background: #f9f9f9;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
}
.leave-page h2 {
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
.leave-page table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}
.leave-page th, .leave-page td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.leave-page button {
  width: fit-content;
  padding: 8px 18px;
  border-radius: 5px;
  border: none;
  background: #42b983;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-right: 8px;
}
.leave-page button:hover {
  background: #2c8c6d;
}
</style>