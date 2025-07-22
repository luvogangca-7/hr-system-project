<template>
  <div class="page-wrapper">
      <div class="heading">
     <h1>Employees</h1>

 <p>Managing your employees has never been easier.</p>


  </div>


 <div class="main-page">

 <input
  v-model="search"
  type="text"
  placeholder="Search employee by name, position, or department"
  class="search-input"
/>


   <button class="addBtn" @click="showAdd()">{{ addEmp ? 'Hide' : 'Add employee'}}</button>

  <div class="main-page" v-if="this.addEmp">

   <h3>Add new employee</h3>

  <employee-form
  :employee="editingEmployee"
  @add-employee="addEmployee"
  @update-employee="updateEmployee"
/>

 </div>

 
 <employee-comp
  :employees="filteredEmployees"
  @edit-employee="editEmployee"
  @delete-employee="deleteEmployee"
/>

 </div>

  </div>



 
 
</template>
<script>
import EmployeeComp from '@/components/EmployeeComp.vue';
import EmployeeForm from '@/components/EmployeeForm.vue';

export default{
   data() {
    return {
      employees: [],
      editingEmployee: null,
      addEmp: false,
      search: ''
    }
  },
  async mounted() {
    await this.fetchEmployees();
  },
  computed: {
    filteredEmployees() {
      if (!this.search) return this.employees;
      const q = this.search.toLowerCase();
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(q) ||
        emp.position.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q)
      );
    }
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
  this.addEmp = true;
},
updateEmployee(updatedEmployee) {
  const idx = this.employees.findIndex(e => e.id === updatedEmployee.id);
  if (idx !== -1) {
    this.employees.splice(idx, 1, updatedEmployee);
  }
  this.editingEmployee = null;
  this.showAdd()
},
showAdd(){
    this.addEmp = !this.addEmp;
}
},

  components:{
    EmployeeComp,
    EmployeeForm

  }
}
</script>
<style>

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

.addBtn {
  background-color: #af2727;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
  margin-bottom: 8px;
  width: fit-content;
}

.search-input {
  display: flex;
  min-width: 200px;
  max-width: 100%;
  margin-bottom: 18px;
  padding: 8px 12px;
  width: 75%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  transition: width 0.2s;
}

@media (max-width: 900px) {
  .search-input {
    width: 60%;
  }
}

@media (max-width: 600px) {
  .search-input {
    width: 100%;
    min-width: 200px;
  }
}
</style>
