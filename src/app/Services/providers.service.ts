// providers.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Providers } from "../Model/providers";

@Injectable({
    providedIn: 'root',
})
export class ProvidersService {

    constructor(private http: HttpClient) {}

    getAllProviders(): Observable<Providers[]> {
        return this.http.get<Providers[]>('http://localhost:8081/providers');
    }

    createProvider(provider:string, health:string, dental:string, vision: string, life: string): Observable<Providers> {
        // const params = new URLSearchParams();
        // params.append("providerName", provider);
        // params.append("health", health);
        // params.append("dental", dental);
        // params.append("vision", vision);
        // params.append("life", life);
        const body = {
            providerName: provider,
            health: health,
            dental: dental,
            vision: vision,
            life: life
          };
          console.log('body',body);
        return this.http.post<Providers>('http://localhost:8081/providers', body);
    }

    deleteProviders(providerName:string){
        return this.http.delete<Providers>('http://localhost:8081/providers/'+`${providerName}`);
    }
}
