import { Component, OnInit } from '@angular/core';
// import { Response } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
// import { AuthService } from "../../auth/auth.service";
// import { DataStorageService } from "../../shared/data-storage.service";
import { Store } from '@ngrx/store';
// import { HttpEvent,HttpEventType } from "@angular/common/http";
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',

})
export class HeaderComponent implements OnInit{
    authState:Observable<fromAuth.State>;
    constructor(private store:Store<fromApp.AppState>){}
                // private authService:AuthService,
                // private router:Router,
                // private dataStorageService:DataStorageService,
                // private route:ActivatedRoute,
            
//  @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string){
    //     this.featureSelected.emit(feature);
    //     // console.log(feature);
    // }

    ngOnInit(){
        this.authState=this.store.select('auth');
    }
    
    onSaveData(){
        // this.dataStorageService.storeRecipes()
        // .subscribe(
        //     (response)=>{
        //         console.log(response);
        //     }
        // );
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData(){
        // this.dataStorageService.fetchRecipes();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
        // this.router.navigate(['logout'],{relativeTo:this.route});
    }
}