<template>
    <div class="form-container">
    <form @submit.prevent="submitForm" class="mb-4">
    <input v-model="employeeData.name" placeholder="Full Name" required class="form-control mb-2" />
    <input v-model="employeeData.position" placeholder="Position" required class="form-control mb-2" />
    <input v-model="employeeData.department" placeholder="Department" required class="form-control mb-2" />
    <input v-model.number="employeeData.salary" placeholder="Salary" type="number" required class="form-control mb-2" />
    <input v-model="employeeData.history" placeholder="Employment History" class="form-control mb-2" />
    <input v-model="employeeData.contact" placeholder="Email Address" type="email" required class="form-control mb-2" />
    <button type="submit" class="btn btn-primary" id="sub">{{ employee && employee.id ? 'Update Employee' : 'Add Employee' }}</button>
  </form>
    </div>
  
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      employeeData: {
        name: '',
        position: '',
        department: '',
        salary: '',
        history: '',
        contact: ''
      }
    }
  },
  watch: {
    employee: {
      handler(newVal) {
        if (newVal) {
          this.employeeData = { ...newVal };
        } else {
          this.employeeData = {
            name: '',
            position: '',
            department: '',
            salary: '',
            history: '',
            contact: ''
          };
        }
      },
      immediate: true
    }
  },
  methods: {
    submitForm() {
      if (this.employee && this.employee.id) {
        // Editing existing employee
        this.$emit('update-employee', { ...this.employeeData, id: this.employee.id });
      } else {
        // Adding new employee
        this.$emit('add-employee', { ...this.employeeData });
      }
      // Reset form
      this.employeeData = {
        name: '',
        position: '',
        department: '',
        salary: '',
        history: '',
        contact: ''
      };
    }
  }
}
</script>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 100px;
    }

    #sub {
        margin-top: 15px;
    }
</style>