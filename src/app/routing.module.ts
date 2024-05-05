import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { AuthGuard } from "./Services/auth.service";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { ProvidersComponent } from "./components/providers/providers.component";


export const routes: Routes = [
    // {
    //     path : "",
    //     redirectTo : "dashboard",
    //     pathMatch : "full"
    // },

    {
        path : "dashboard",
        component : DashboardComponent
    },

    {
        path : "addProviders",
        component : ProvidersComponent
    },


    {
        path : "upload-file",
        component : UploadFileComponent,
       
    },
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