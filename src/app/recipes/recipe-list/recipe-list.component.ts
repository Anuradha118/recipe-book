import { Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
// import {Recipe} from '../recipe.model';
// import {RecipeService} from '../recipe.service';
// import { Subscription } from "rxjs/Subscription";
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
// export class RecipeListComponent implements OnInit,OnDestroy {
  export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // recipes:Recipe[];
  recipeState:Observable<fromRecipe.State>;
  // subscription:Subscription;
// recipes = new EventEmitter<Recipe>();
  constructor(private router:Router,
              // private recipeService: RecipeService,
              // private authService:AuthService,
              private route:ActivatedRoute,
              private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipeState=this.store.select('recipes');
    // this.subscription=this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes:Recipe[])=>{
    //       this.recipes=recipes;
    //     }
    //   );
    // this.recipes=this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    // if(this.authServiice.isAuthenticated()){
    //   this.router.navigate(['new'],{relativeTo:this.route});
    // }
    // else{
    //   this.router.navigate(['/logout']);
    // }
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
