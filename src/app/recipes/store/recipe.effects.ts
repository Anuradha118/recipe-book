import { Effect, Actions } from "@ngrx/effects";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch=this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action:RecipeActions.FetchRecipes) => {
           return  this.httpClient.get<Recipe[]>('https://ng-recipe-book-73b01.firebaseio.com/recipes.json',{
                observe:'body',
                responseType:'json'
            })        
        })
        .map(
            // (response:Response)=>{
            //     const recipes:Recipe[]=response.json();
            (recipes)=>{
                console.log(recipes);
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients']=[];
                    }
                }
                // return recipes;
                // return [];
                return {
                    type:RecipeActions.SET_RECIPES,
                    payload:recipes
                };
            }
        ); 
    @Effect({dispatch:false})
    recipeStore=this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action,state])=>{
            const req= new HttpRequest('PUT','https://ng-recipe-book-73b01.firebaseio.com/recipes.json',
            state.recipes,{reportProgress:true});
            return this.httpClient.request(req);
        });
    constructor(private actions$:Actions,
                private httpClient:HttpClient,
                private store:Store<fromRecipe.FeatureState>){}
}