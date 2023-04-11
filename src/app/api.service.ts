import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmployee(data:any){
    return this.http.post("",data)
    .pipe(map((res) => {
      return res;
    }))
  }
  getEmployee(){
    return this.http.get("")
    .pipe(map((res) => {
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>(""+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,id:number){
    return this.http.put(""+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
