import { Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
// import {ShoppingListService} from './shopping-list.service';
import { Subscription } from "rxjs/Subscription";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
// export class ShoppingListComponent implements OnInit,OnDestroy {
  export class ShoppingListComponent implements OnInit {
  // ingredients:Ingredient[];
  shoppingListState:Observable<{ingredients:Ingredient[]}>;
// private subscription:Subscription;

  // constructor(private shoppingLisService: ShoppingListService,private store:Store<fromShoppingList.AppState>) { }
  constructor(private store:Store<fromApp.AppState>) { }
  
  ngOnInit() {
    // this.ingredients=this.shoppingLisService.getIngredients();
    this.shoppingListState=this.store.select('shoppingList');
    // this.subscription=this.shoppingLisService.ingredientsChanged
    // .subscribe(
    //   (ingredients:Ingredient[])=>{
    //     this.ingredients=ingredients;
    //   }
    // );
  }

  onEditItem(index:number){
    // this.shoppingLisService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
    // onIngredientAdded(ingredient:Ingredient){
    //   // this.ingredients.push(ingredient);
    //   this.shoppingLisService.addIngredient(ingredient);
    // }

}
