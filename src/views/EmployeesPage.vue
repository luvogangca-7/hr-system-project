<template>
 <h1>Employees</h1>

 <p>Managing your employees has never been easier.</p>

 <h3>Add new employee</h3>

<employee-form
  :employee="editingEmployee"
  @add-employee="addEmployee"
  @update-employee="updateEmployee"
/>

 <employee-comp
  :employees="employees"
  @edit-employee="editEmployee"
  @delete-employee="deleteEmployee"
/>

 

 <!-- <div class="container">
  <input type="text" name="Name" placeholder="Add new employee name...">
  <input type="text" name="Name" placeholder="Add employee's position...">
  <input type="text" name="Name" placeholder="Add department...">
  <input type="number" name="Name" placeholder="Add salary...">
  <input type="text" name="Name" placeholder="Add history...">
  <input type="text" name="Name" placeholder="Add email...">
 </div> -->
 
</template>
<script>
import EmployeeComp from '@/components/EmployeeComp.vue';
import EmployeeForm from '@/components/EmployeeForm.vue';

export default{
   data() {
    return {
      employees: [],
      editingEmployee: null
    }
  },
  async mounted() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await fetch('/hr-data/employee_info.json');
        const data = await response.json();
        console.log('Fetched data:', data);
        this.employees = data.employeeInformation.map(item => ({
          id: item.employeeId,
          name: item.name,
          position: item.position,
          department: item.department,
          salary: item.salary,
          history: item.employmentHistory,
          contact: item.contact
        }));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    addEmployee(newEmployee) {
    const newId = this.employees.length
      ? Math.max(...this.employees.map(e => e.id || 0)) + 1
      : 1;
    this.employees.push({
      id: newId,
      ...newEmployee
    });
  },
  deleteEmployee(employee) {
    this.employees = this.employees.filter(e => e.id !== employee.id);
  },
  editEmployee(employee) {
  // Set the employee to be edited
  this.editingEmployee = { ...employee };
},
updateEmployee(updatedEmployee) {
  const idx = this.employees.findIndex(e => e.id === updatedEmployee.id);
  if (idx !== -1) {
    this.employees.splice(idx, 1, updatedEmployee);
  }
  this.editingEmployee = null;
}
},

  components:{
    EmployeeComp,
    EmployeeForm

  }
}
</script>
<style>

h1 {
  font-weight: 700;
}

h3 {
  padding: 20px 0;
}
.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
 }

table {
  width: 100%;
  padding: 0 50px;
  border: 1px solid gray;
}

td {
  text-align: start;
  padding: 20px;
  margin: 20px;
}

td, th {
  border-left-color: gray;
}

</style>
