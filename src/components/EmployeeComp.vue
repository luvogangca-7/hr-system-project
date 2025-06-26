<template>
<div class="table-container">
  <table class="table table-striped-columns">
    <thead>
      <tr>
      <th>Full Name</th>
      <th>Position</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Employment History</th>
      <th>Email Address</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee.id">
      <td>{{ employee.name }}</td>
      <td>{{ employee.position }}</td>
      <td>{{ employee.department }}</td>
      <td>R {{ employee.salary }}</td>
      <td>{{ employee.history }}</td>
      <td>{{ employee.contact }}</td>
      <td><button class="edit" @click="$emit('edit-employee', employee)">Edit</button></td>
      <td><button class="delete" @click="$emit('delete-employee', employee)">Delete</button></td>
    </tr>
    </tbody>
    
  </table>
 </div>
</template>
<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
  button {
    padding: 5px 7px;
    border: none;
    border-radius: 4px;
    color: white;
    
  }

  .edit{
    background-color: rgb(53, 76, 207);
  }

  .delete {
    background-color: rgb(217, 22, 22);
  }
</style>