// import { Injectable } from "@angular/core";
// // import { Http,Response } from "@angular/http";
// import { RecipeService } from "../recipes/recipe.service";
// import { Recipe } from "../recipes/recipe.model";
// import 'rxjs/';
// // import { AuthService } from "../auth/auth.service";
// import { HttpClient,HttpHeaders,HttpParams,HttpRequest } from "@angular/common/http";


// @Injectable()
// export class DataStorageService{
//     constructor(private httpClient:HttpClient,
//                 // private authService:AuthService,
//                 private recipeService:RecipeService){}

//     storeRecipes(){
//         // const token= this.authService.getToken();
//         // const headers=new HttpHeaders().set('Authorization','Bearer afdklasflaldf')

//     //    return this.httpClient.put('https://ng-recipe-book-73b01.firebaseio.com/recipes.json',this.recipeService.getRecipes(),{
//     //        observe:'body',
//     //        params: new HttpParams().set('auth',token)
//     //     //    headers: headers
//     //    });
//     const req= new HttpRequest('PUT','https://ng-recipe-book-73b01.firebaseio.com/recipes.json',
//     this.recipeService.getRecipes(),{reportProgress:true});
//     return this.httpClient.request(req);
// }

//     fetchRecipes(){
//         // const token= this.authService.getToken();
        
//         // this.httpClient.get<Recipe[]>('https://ng-recipe-book-73b01.firebaseio.com/recipes.json?auth='+token)
        
//         this.httpClient.get<Recipe[]>('https://ng-recipe-book-73b01.firebaseio.com/recipes.json',{
//             observe:'body',
//             responseType:'json'
//         })
//             .map(
//                 // (response:Response)=>{
//                 //     const recipes:Recipe[]=response.json();
//                 (recipes)=>{
//                     console.log(recipes);
//                     for(let recipe of recipes){
//                         if(!recipe['ingredients']){
//                             recipe['ingredients']=[];
//                         }
//                     }
//                     return recipes;
//                     // return [];
//                 }
//             )
//             .subscribe(
//                 (recipes:Recipe[])=>{
//                     this.recipeService.setRecipes(recipes);
//                 }
//             );
//     }
// }