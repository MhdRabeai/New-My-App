import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  addEmployee(data: any) {
    return this.http.post('http://localhost:3000/employees', data);
  }
  getEmployees() {
    return this.http.get('http://localhost:3000/employees');
  }
  getEmployee(id: any) {
    return this.http.get(`http://localhost:3000/employees/${id}`);
  }
  deleteEmployees(id: number) {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
  updateEmployee(id: number, data: any) {
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }
}
