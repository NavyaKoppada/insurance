import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from "@angular/material/tooltip";
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RoutingModule } from './routing.module';
import { provideRouter } from '@angular/router';
import { routes } from './routing.module'
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './components/init/keycloak-init.factory';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { MatTableModule } from "@angular/material/table";
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomEditButtonComponent } from './components/providers/custom-edit-button/custom-edit-button.component';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { CustomDeleteButtonComponent } from './components/providers/custom-delete-button/custom-delete-button.component';
import { AddProviderComponent } from './components/providers/add-provider/add-provider.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    UploadFileComponent,
    DashboardComponent,
    ProvidersComponent,
    LoginComponent,
    CustomEditButtonComponent,
    CustomDeleteButtonComponent,
    AddProviderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    RoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    ToastrModule.forRoot(),
    AgChartsAngular,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    AgGridModule,
      
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideRouter(routes),
    // provideClientHydration(),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    provideHttpClient(
      withInterceptorsFromDi() // tell httpClient to use interceptors from DI
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
