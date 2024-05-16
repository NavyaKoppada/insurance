import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'http://localhost:8081/';
  private errorSubject = new Subject<string>();

  constructor(private http: HttpClient,
              private loggingService : LoggingService 
  ) { }

  uploadFile(file: File, providerName: any) {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('providerName', providerName)
    return this.http.post<any>(this.apiUrl+'upload', formData)
    .pipe(
      catchError(this.handleError.bind(this,'Failed to upload file. Please try again.'))
    );
  }

  getAllData() {
    return this.http.get<any>(this.apiUrl+'invoices')
    .pipe(
      catchError(this.handleError.bind(this,'Failed to fetch data. Please try again.'))
    );
  }

  getInvoicesByType(providerName: any) {
    const params = new URLSearchParams();
    params.append("providerName", providerName)
    return this.http.get<any>(this.apiUrl+'invoices')
    .pipe(this.handleError.bind(this,'Failed to fetch invoices. Please try again.'));
  }

  private handleError(customErrorMessage : string, error : HttpErrorResponse){
    this.errorSubject.next(customErrorMessage);
    const errObj = {statusCode:error.status, errorMessage : error.message, datetime : new Date()};
    this.loggingService.logError(errObj);
    return throwError(()=>error);
  }

  getErrorSubject(): Observable<string>{
    return this.errorSubject.asObservable();
  }
}
