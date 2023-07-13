import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { CoreService } from 'src/app/services/core.service';
import { EmpComponent } from '../emp/emp.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getEmplyees();
  }

  constructor(
    public dialog: MatDialog,
    private es: EmployeeService,
    private cs: CoreService
  ) {}

  empForm() {
    const DialgRef = this.dialog.open(EmpComponent);
    DialgRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEmplyees();
          console.log(this.getEmplyees());
        }
      },
    });
  }
  openEditForm(data: any) {
    const Ref = this.dialog.open(EmpComponent, { data });
    Ref.afterClosed().subscribe(
      (val: any) => {
        if (val) {
          this.getEmplyees();
        }
      },
      (err: any) => {
        console.log('Error', err.message);
      }
    );
  }
  getEmplyees() {
    return this.es.getEmployees().subscribe(
      (res) => {
        console.log('Res', res);
        this.dataSource = new MatTableDataSource(<any>res);
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.warn('Er', err.message);
      }
    );
  }
  deleteEmplyee(id: number) {
    if (window.confirm('Are You Sure ?')) {
      this.es.deleteEmployees(id).subscribe(
        () => {
          this.cs.openSnackBar('Emplyee Deleted!', 'Done');
          this.getEmplyees();
        },
        (err) => {
          this.cs.openSnackBar(err.message, 'Error');
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
