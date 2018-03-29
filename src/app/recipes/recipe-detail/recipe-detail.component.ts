import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
// import {Recipe} from '../recipe.model';
// import {RecipeService} from '../recipe.service';
// import { AuthService } from "../../auth/auth.service";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
// import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe:Recipe;
  // recipe:Recipe;
  recipeState:Observable<fromRecipe.State>;
  id:number;
  constructor(private route:ActivatedRoute,
              private router:Router,
              // private recipeService:RecipeService,
              // private authService:AuthService,
              private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        // this.recipe=this.recipeService.getRecipe(this.id);
        this.recipeState=this.store.select('recipes');
      });
  }
  
  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState:fromRecipe.State)=>{
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    // if(this.authService.isAuthenticated()){
    //   this.router.navigate(['edit'],{relativeTo:this.route});
    //   //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
    // }
    // else{
    //   this.router.navigate(['/recipes']);
    // }
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
