import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css'],
})
export class EmpComponent implements OnInit {
  empForm!: FormGroup;

  education: string[] = [
    'Mareic',
    'Diplma',
    'Intermediate',
    'Graduate',
    'PostG raduate',
  ];
  constructor(
    private fb: FormBuilder,
    private eS: EmployeeService,
    private dilogRef: MatDialogRef<EmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: CoreService
  ) {
    this.empForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.eS.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.cs.openSnackBar('Employee detail updated!');
            this.dilogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.eS.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.cs.openSnackBar('Employee added successfully');
            this.dilogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  confirm() {
    if (window.confirm('Are You Sure?')) {
      this.dilogRef.close(true);
    }
  }
}
