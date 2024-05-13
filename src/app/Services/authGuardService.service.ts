import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


export interface IDeactivate{
    canExit:() => boolean | Observable<boolean> | Promise<boolean> 
}

@Injectable({
    providedIn:'root',
})
export class AuthGuardService {

    canDeactivate(component: IDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        return component.canExit();
    }
}