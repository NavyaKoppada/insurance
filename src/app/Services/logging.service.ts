import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  logError(data: { statusCode: number, errorMessage: string, datetime: Date }) {
    this.http.post('http://localhost:8081/logs/errordata', data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error posting log data:', error);
          // Handle the error here, for example, by logging it to the console or notifying the user
          return throwError('Failed to log error data');
        })
      )
      .subscribe(() => {
        console.log('Log data posted successfully');
      });
  }
}
