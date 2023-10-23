import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  addEmployee(data: any) {
    return this.http.post('https://json-server-avob.onrender.com/employees', data);
  }
  getEmployees() {
    return this.http.get('https://json-server-avob.onrender.com/employees');
  }
  getEmployee(id: any) {
    return this.http.get(`https://json-server-avob.onrender.com/employees/${id}`);
  }
  deleteEmployees(id: number) {
    return this.http.delete(`https://json-server-avob.onrender.com/employees/${id}`);
  }
  updateEmployee(id: number, data: any) {
    return this.http.put(`https://json-server-avob.onrender.com/employees/${id}`, data);
  }
}
