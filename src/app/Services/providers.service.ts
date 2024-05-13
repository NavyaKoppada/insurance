import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Providers } from "../Model/providers";

@Injectable({
    providedIn: 'root',
})
export class ProvidersService {

    constructor(private http: HttpClient) {}

    providersName: string = '';

    getAllProviders(): Observable<Providers[]> {
        return this.http.get<Providers[]>('http://localhost:8081/providers');
    }

    createProvider(providerData: any): Observable<Providers> {
        return this.http.post<Providers>('http://localhost:8081/providers', providerData);
    }

    deleteProviders(providerName:string){
        return this.http.delete<Providers>('http://localhost:8081/providers/'+`${providerName}`);
    }
}
