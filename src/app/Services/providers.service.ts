import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoggingService } from "./logging.service";

@Injectable({
    providedIn: 'root',
})
export class ProvidersService {
    private apiUrl = 'http://localhost:8081/providers';
    private errorSubject = new Subject<string>();

    constructor(private http: HttpClient,
        private loggingService: LoggingService
    ) { }

    getAllProviders(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError.bind(this, "Unable to Load the Providers data"))
            );
    }

    createProvider(formData: any): Observable<any> {
        return this.http.post<any>('http://localhost:8081/provider', formData)
            .pipe(
                catchError(this.handleError.bind(this, "Unable to Create New Provider"))
            );
    }

    deleteProviders(providerName: string): Observable<any> {
        const url = `http://localhost:8081/provider/${providerName}`;
        return this.http.delete<any>(url)
            .pipe(
                catchError(this.handleError.bind(this, "Unable to delete the provider"))
            );
    }

    private handleError(customErrorMessage: string, error: HttpErrorResponse) {
        this.errorSubject.next(customErrorMessage);
        const errObj = { statusCode: error.status, errorMessage: error.message, datetime: new Date() }
        this.loggingService.logError(errObj);
        return throwError(() => error);
    }

    getErrorSubject(): Observable<string> {
        return this.errorSubject.asObservable();
    }
}
