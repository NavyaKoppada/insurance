import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakOperationService } from 'src/app/Services/keycloak.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  progressValue: number | undefined;
  constructor(
    // private config: AppConfigService,
    // private loginService: LoginService,
    private router: Router,
    private keycloak: KeycloakService
    // private progressService: ProgressServiceService
  ) { }

  logout(): void {
    // let authType = this.config.getApiUrls().authType;
    // if (authType == "keyclock") {
    //   this.loginService
    //     .logout(localStorage.getItem("refreshToken") as any)
    //     .subscribe({
    //       next: (_) => {
    //         this.router.navigateByUrl("/login");
    //       },
    //       error: (err: Error) => {
    //         alert(err.message);
    //       },
    //     });
    // }
    this.keycloak.logout();
    // localStorage.clear();
    // sessionStorage.clear();
  }

  // updateProgressValue() {
  //   this.progressValue = this.progressService.getProgressValue();
  //   return this.progressValue;
  // }

  // shouldShowProgressBar(): boolean {
  //   return this.progressService.getShowProgressBar();
  // }
}
