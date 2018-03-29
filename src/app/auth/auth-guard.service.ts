import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
// import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
// export class AuthGuard implements CanActivate,CanLoad{
export class AuthGuard implements CanActivate{
    // constructor(private authService:AuthService){}
    constructor(private store:Store<fromApp.AppState>){}

    canActivate(route : ActivatedRouteSnapshot, state:RouterStateSnapshot){
        // return this.authService.isAuthenticated();
        return this.store.select('auth')
            .take(1)
            .map((authState:fromAuth.State)=>{
            return authState.authenticated;
        });
    }
    //  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    //      return this.authService.isAuthenticated();
    //  }
}