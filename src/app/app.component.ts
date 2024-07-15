import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from './service/core.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnInit {
  title = 'Student List';

  displayedColumns: string[] = [
    'id',
    'studentName',
    'rollNumber',
    'emailId',
    'phoneNumber',
    'city',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _appService: AppService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) { }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }
  


  OpenAddEditForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadData();
        }
      }

    })
  }

  OpenDeleteForm(Id: number) {
    const dialogRef = this._dialog.open(StudentDeleteComponent, {
      data: { Id }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadData();
        }
      }

    })
  }

  OpenEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadData();
        }
      }

    })

  }

  deletedata(id: number) {
    this._appService.deletedata(id).subscribe({
      next: (res: any) => {
        this.loadData();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadData() {
    this._appService.getdata().subscribe((data: any) => {
      this.dataSource.data = data
    })
  }
}
