import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, providerName: any) {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('providerName', providerName)
    return this.http.post<any>('http://localhost:8081/upload', formData);
  }

  getAllData() {
    return this.http.get<any>('http://localhost:8081/invoices');
  }

  getInvoicesByType(providerName: any) {
    const params = new URLSearchParams();
    params.append("providerName", providerName)
    return this.http.get<any>('http://localhost:8081/invoices');
  }
}
