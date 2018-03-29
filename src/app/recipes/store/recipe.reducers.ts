import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers'

export interface FeatureState extends fromApp.AppState{
    recipes:State
}

export interface State {
    recipes:Recipe[];
}
const initialState:State={
    recipes:[
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel-just awesome!',
            'https://juliegoodwin.com.au/wordpress/wp-content/uploads/2015/09/800-pork-schnitzel.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'Big Fat Burger',
            'What else you need to say?',
            'http://res.cloudinary.com/cheersy/image/upload/dxdq0sts4retry6gfww7.jpg',
            [
                new Ingredient('Buns',2),
                new Ingredient('Meat',1)
            ]
        )
    ]
};

export function recipeReducer(state= initialState,action:RecipeActions.RecipeActions){
    switch(action.type){
        case(RecipeActions.SET_RECIPES):
            return {
            ...state,
            recipes:[...action.payload]
            };
        case(RecipeActions.ADD_RECIPE):
            return {
            ...state,
            recipes:[...state.recipes,action.payload]
            };
        case(RecipeActions.UPDATE_RECIPE):
            const recipe= state.recipes[action.payload.index];
            const updatedRecipe={
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes=[...state.recipes];
            recipes[action.payload.index]=updatedRecipe;
            return{
                ...state,
                recipes:recipes
            };
        case(RecipeActions.DELETE_RECIPE):
            const oldrecipes=[...state.recipes];
            oldrecipes.splice(action.payload,1);
            return {
                ...state,
                recipes:oldrecipes
            };
        default:
            return state;
    }
}