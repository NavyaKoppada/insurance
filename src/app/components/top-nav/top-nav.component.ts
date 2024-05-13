import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  logout(): void {
    this.keycloakService.logout().then(() => {
      console.log("hello");
      // Redirect to login page or any other page after logout
      this.router.navigate(['/realms/myrealm/account']); // Adjust the route as per your application
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }
  
}
