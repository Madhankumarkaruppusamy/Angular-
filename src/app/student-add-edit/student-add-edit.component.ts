import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../service/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
  studentform: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    private _coreService:CoreService
  ) {

    this.studentform = this._fb.group({
      studentName: '',
      rollNumber: '',
      emailId: '',
      phoneNumber: '',
      city: '',

    })
  }
  ngOnInit(): void {
    this.studentform.patchValue(this.data);
  }
  
  OnFormSubmit() {
    if (this.studentform.valid) {
      if (this.data) {
        this._appService.putdata(this.data.id, this.studentform.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee updated!','')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })

      }
      else {
        this._appService.adddata(this.studentform.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee saved!','')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }
}