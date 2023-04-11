import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './emp.model';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-emp-dash',
  templateUrl: './emp-dash.component.html',
  styleUrls: ['./emp-dash.component.css']
})
export class EmpDashComponent {

  formValue!:FormGroup
  employeeData:any
  employeeobj : EmployeeModel = new EmployeeModel();
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService){}

  ngOnInit(){
    this.formValue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
  }

  postEmployeeDetails(){
    this.employeeobj.firstname = this.formValue.value.firstname;
    this.employeeobj.lastname = this.formValue.value.lastname;
    this.employeeobj.email = this.formValue.value.email;
    this.employeeobj.mobile = this.formValue.value.mobile;
    this.employeeobj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeobj)
    .subscribe(res => {
      alert("Employee Added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    },
    err => {
      alert("Something went wrong")
    })

  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;

    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }

  onEdit(row:any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeobj.id = row.id
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeobj.firstname = this.formValue.value.firstname;
    this.employeeobj.lastname = this.formValue.value.lastname;
    this.employeeobj.email = this.formValue.value.email;
    this.employeeobj.mobile = this.formValue.value.mobile;
    this.employeeobj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeobj,this.employeeobj.id)
    .subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  add_emp(){
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }
}
