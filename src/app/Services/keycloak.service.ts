// keycloak.service.ts
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

@Injectable({
    providedIn: 'root',
})
export class KeycloakOperationService {
    // constructor(private keycloak: KeycloakService) { }
    
    // isLoggedIn(): boolean {
    //     return this.keycloak.isLoggedIn();
    // }

    // logout(): Promise<void> {
    //     return this.keycloak.logout(); // Return the Promise returned by Keycloak logout
    // }

    // getUserProfile(): any {
    //     return this.keycloak.loadUserProfile();
    // }
}
