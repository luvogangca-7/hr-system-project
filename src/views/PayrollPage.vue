<template>

  <h1>Payroll</h1>
  <p>Pay your employees seamlessly.</p>
  <PayrollComp
  :records="payrollList"
  @edit="openEditModal"
  @delete="deleteRecord"
  @generate="generatePayslip"
/>
</template>
<script>
import { jsPDF } from "jspdf";
import PayrollComp from "@/components/PayrollComp.vue";
import * as bootstrap from "bootstrap";

export default {
  name: "PayrollPage",
  components: { PayrollComp },
  data() {
    return {
      payrollList: [],
      editForm: { id: null, name: "", hoursWorked: 0, leaveDeductions: 0, salary: 0 },
    };
  },
  async mounted() {
    try {
      const [payrollRes, employeeRes] = await Promise.all([
        fetch('/hr-data/payroll_data.json'),
        fetch('/hr-data/employee_info.json')
      ]);
      const payrollData = await payrollRes.json();
      const employeeData = await employeeRes.json();

      this.payrollList = payrollData.payrollData.map(item => {
        const emp = employeeData.employeeInformation.find(e => e.employeeId === item.employeeId);
        return {
          id: item.employeeId,
          name: emp ? emp.name : 'Unknown',
          hoursWorked: item.hoursWorked,
          leaveDeductions: item.leaveDeductions,
          salary: item.finalSalary
        };
      });
    } catch (error) {
      console.error('Failed to fetch payroll data:', error);
    }
  },
  methods: {
    generatePayslip(employee) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Payslip", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Employee Name: ${employee.name}`, 20, 40);
      doc.text(`Employee ID: ${employee.id}`, 20, 50);
      doc.text(`Hours Worked: ${employee.hoursWorked}`, 20, 60);
      doc.text(`Leave Deductions: ${employee.leaveDeductions}`, 20, 70);
      doc.text(`Salary: R${employee.salary}`, 20, 80);

      doc.save(`Payslip_${employee.name.replace(/\s+/g, "_")}.pdf`);
    },
    deleteRecord(id) {
      this.payrollList = this.payrollList.filter((record) => record.id !== id);
    },
    openEditModal(employee) {
      this.editForm = { ...employee };
      const modal = new bootstrap.Modal(this.$refs.editModal);
      modal.show();
    },
    saveEdit() {
      const index = this.payrollList.findIndex((e) => e.id === this.editForm.id);
      if (index !== -1) {
        // Edit existing
        this.payrollList.splice(index, 1, { ...this.editForm });
      } else {
        // Add new
        this.payrollList.push({ ...this.editForm });
      }
      const modal = bootstrap.Modal.getInstance(this.$refs.editModal);
      modal.hide();
    },
    addPayroll() {
      const newId = this.payrollList.length
        ? Math.max(...this.payrollList.map(e => e.id)) + 1
        : 1;
      this.editForm = {
        id: newId,
        name: "",
        hoursWorked: 0,
        leaveDeductions: 0,
        salary: 0
      };
      const modal = new bootstrap.Modal(this.$refs.editModal);
      modal.show();
    }
  }
};
</script>