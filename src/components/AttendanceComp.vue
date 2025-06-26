<template>
  <div>
    <table style="border: 1px solid lightgrey;" class="table table-bordered table-striped-columns">
      <thead class = "table-light">
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>{{ record.employee }}</td>
          <td>{{ record.date }}</td>
          <td>{{ record.status }}</td>
          <td>
            <button @click="deleteRecord(index)" style="background-color: #f44336; color: white; border: none; padding: 6px 12px; cursor: pointer;">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AttendanceComp",
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteRecord(index) {
      this.$emit('delete-record', index);
    }
  }
}
</script>