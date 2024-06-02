import { Component, Inject } from '@angular/core';
import { AppService } from '../service/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent {
  ID: number;

  constructor(
    private _appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<StudentDeleteComponent>,
    private _coreService: CoreService
  ) {
    this.ID = data.Id;
  }


  OnFormSubmit() {
    console.log('Form submit triggered with ID:', this.ID);
    if (this.data) {
      this._appService.deletedata(this.ID).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee deleted!', '')
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
    else {
      console.error('ID is null or undefined');
    }
  }
}