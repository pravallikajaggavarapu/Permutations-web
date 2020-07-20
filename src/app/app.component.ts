import { Component, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import {headersToString} from "selenium-webdriver/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['numbers'];
  dataSource;
  paginatorForm: FormGroup;

  constructor(private http: HttpClient,
  private fb: FormBuilder){
    this.buildForm();
  }

  buildForm() {
    this.paginatorForm = this.fb.group({
      number: ['']
    })
  }
  fetchData() {
    this.http.post<any>('http://localhost:8080/permutations', this.paginatorForm.get('number').value).subscribe( res=> {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  checkForAlphaNumeric(event: any) {
    return (event.charCode == 13 || (event.charCode >= 48 && event.charCode <= 57)
      || event.charCode == 13 || event.charCode === 32 || (event.charCode >= 65 &&
        event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122));
  }
}


