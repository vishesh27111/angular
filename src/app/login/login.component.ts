import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this.http.get<any>("")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Logged In")
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
      else{
        alert("User not found")
      }
    },err=>{
      alert("Something went wrong")
    })
  }
}
