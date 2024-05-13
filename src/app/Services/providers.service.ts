import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ProvidersService {
    private apiUrl = 'http://localhost:8081/providers';
    private errorSubject = new Subject<string>();

    constructor(private http: HttpClient) {}

    getAllProviders(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    createProvider(formData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, formData)
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    deleteProviders(providerName: string): Observable<any> {
        const url = `${this.apiUrl}/${providerName}`;
        return this.http.delete<any>(url)
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
        }
        console.error(errorMessage);
        this.errorSubject.next(errorMessage);
        return throwError(()=>errorMessage);
    }

    getErrorSubject(): Observable<string> {
        return this.errorSubject.asObservable();
    }
}
