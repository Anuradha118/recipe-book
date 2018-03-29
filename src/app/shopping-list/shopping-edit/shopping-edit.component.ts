import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
// import {ShoppingListService} from '../shopping-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  editMode=false;
  // editedItemIndex:number;
  editedItem:Ingredient;
  @ViewChild('f') slForm:NgForm;
  // @ViewChild('nameInput')nameInputRef:ElementRef;
  // @ViewChild('amountInput')amountInputRef:ElementRef;
  // @Output()ingredientAdded = new EventEmitter<Ingredient>();
  // constructor(private slService:ShoppingListService,private store:Store<fromShoppingList.AppState>) { }
  constructor(private store:Store<fromApp.AppState>) { }
  
  ngOnInit() {
    this.subscription=this.store.select('shoppingList')
    .subscribe(
      data =>{
        if(data.editedIngredientIndex>-1){
          this.editedItem=data.editedIngredient;
          this.editMode=true;
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          });
        } else{
          this.editMode=false;
        }
      }
    );
    // this.subscription=this.slService.startedEditing
    // .subscribe(
    //   (index:number) => {
    //     this.editedItemIndex=index;
    //     this.editMode=true;
    //     this.editedItem=this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name:this.editedItem.name,
    //       amount:this.editedItem.amount
    //     });
    //   }
    // );
  }

    onSubmit(form:NgForm){
      // const ingName=this.nameInputRef.nativeElement.value;
      // const ingAmount=this.amountInputRef.nativeElement.value;
      const value=form.value;
      const newIngredient = new Ingredient(value.name,value.amount);
      // this.ingredientAdded.emit(newIngredient);
      if(this.editMode){
        // this.slService.updateIngredient(this.editedItemIndex,newIngredient);
        this.store.dispatch(new ShoppingListActions.
          UpdateIngredient({ingredient:newIngredient}))
      }
      else{
        // this.slService.addIngredient(newIngredient);
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
      } 
      this.editMode=false;
      form.reset();
    }

    onClear(){
      this.slForm.reset();
      this.editMode=false;
    }

    onDelete(){
      // this.slService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.onClear();
    }

    ngOnDestroy(){
      this.store.dispatch(new ShoppingListActions.StopEdit());
      this.subscription.unsubscribe();
    }

}
