import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router){}

  ngOnInit(){
    this.signupForm = this.formBuilder.group({
      fullname:[''],
      email:[''],
      password:[''],
      mobile:['']
    })
  }

  signUp(){
    this.http.post<any>("",this.signupForm.value)
    .subscribe(res=>{
      alert("Signin success")
      this.signupForm.reset()
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
    })
  }
}
