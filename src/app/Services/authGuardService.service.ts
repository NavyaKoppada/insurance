import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AddProviderComponent } from "../components/providers/add-provider/add-provider.component";


export interface IDeactivate {
    canExit: () => boolean | Observable<boolean> | Promise<boolean>
}

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanDeactivate<IDeactivate> {

    canDeactivate(component: IDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        // setTimeout(()=> {
            return component.canExit();
        // },3000)

    }
}