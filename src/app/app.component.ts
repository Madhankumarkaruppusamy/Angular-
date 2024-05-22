import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { AppService } from './service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // imports: [MatTableModule, MatPaginatorModule]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ProjectAPI';
  displayedColumns: string[] = ['id', 'height', 'width', 'quantity', 'material', 'label', 'isChecked'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private app: AppService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.table();
  }

  ngAfterViewInit() {
   
      this.dataSource.paginator = this.paginator;

  }

  table() {
    this.app.getdata().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
  }

  
}
