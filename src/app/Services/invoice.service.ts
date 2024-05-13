import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn : 'root',
})
export class InvoiceService{
    constructor(private http : HttpClient){}
    getAllInvoices(){
        return this.http.get('http://localhost:8081/invoiceHeaders');
    }
}