import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { AuthGuard } from "./Services/auth.service";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { ProvidersComponent } from "./components/providers/providers.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";
import { AddProviderComponent } from "./components/providers/add-provider/add-provider.component";
import { AuthGuardService } from "./Services/authGuardService.service";
import { NotFoundComponent } from "./not-found/not-found.component";


export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
        // canActivate :[AuthGuard]
    },

    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "addProviders",
        component: ProvidersComponent,
        // canDeactivate : [AuthGuardService],
        canActivate: [AuthGuard],
        // children: [
        //     {
        //       path: "add", 
        //       component: AddProviderComponent,
        //       canDeactivate: [AuthGuardService], 
        //     },
        //   ]
    },


    {
        path: "upload-file",
        component: UploadFileComponent,
        canActivate: [AuthGuard]

    },

    {
        path: "invoices",
        component: InvoiceComponent,
        canActivate: [AuthGuard]
    },

    {
        path: '**',
        component: NotFoundComponent
    }

]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {

}