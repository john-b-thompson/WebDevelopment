import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../Models/recipeState';
import { Ingredient } from '../Models/ingredients';
import { Recipe } from '../Models/recipe';
import { selectRecipeList } from '../Store/Recipe/recipe.selectors';
import { RecipeListAPI } from '../Store/Recipe/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private recipeListStore: Store<State>) { }

  public GetRecipeList(): Recipe[]
  {
    let recipeList = new Array<Recipe>();
    this.recipeListStore.select(selectRecipeList).subscribe(
      (state) => {
          console.log(recipeList);
          if (state.recipeList.length !== 0 )
          {
            recipeList = this.convertToRecipesArray(state.recipeList);
          }
        }      
    );

    return recipeList;
  }

  // Will grab a single recipe based on the index passed in.
  public GetRecipe(index: number): Recipe
  {
    let recipeToReturn: Recipe = {} as Recipe;
    this.recipeListStore.select(selectRecipeList).subscribe(
      {
        next: (state: State) => {
          let newRecipe = state.recipeList[index];
          recipeToReturn = this.convertToRecipe(newRecipe);
        }
      }
    );

    return recipeToReturn;
  }

  // Will save a recipe to the store list.
  public SaveRecipe(recipe: Recipe)
  {    
    this.recipeListStore.dispatch(RecipeListAPI.saveRecipe({recipe: recipe}));
  }

  public SaveRecipeList(recipeList: Recipe[])
  {
    this.recipeListStore.dispatch(RecipeListAPI.saveRecipeList({recipeList: recipeList}));
  }
  
  public DeleteRecipe(recipeList: Recipe[], index: number)
  {
    // Need to grab list remove one from it and
    // then save the list 
    let newRecipeList = recipeList.slice(index, 1);
    this.SaveRecipeList(newRecipeList);
  }

//#region Conversion
  private convertToRecipesArray(oldRecipeList: Recipe[]): Recipe[]
  {
    let newRecipeArray = new Array<Recipe>();

    oldRecipeList.forEach((value) => {
      let newRecipe = this.convertToRecipe(value);
      newRecipeArray.push(newRecipe);
    });

    return newRecipeArray;
  }
  
  private convertToRecipe(oldRecipe: Recipe): Recipe
  {
    let newRecipe: Recipe = new Recipe(
      oldRecipe.Name,
      oldRecipe.Description,
      this.convertToIngredientsArray(oldRecipe.Ingredients),
      this.convertInstructionsToStringArray(oldRecipe.Instructions),
      this.convertTagsToStringArray(oldRecipe.Tags)
    );

    return newRecipe;
  }

  private convertToIngredientsArray(oldIngredientList: Ingredient[]): Ingredient[]
  {
    let newIngredientArray = new Array<Ingredient>();

    oldIngredientList.forEach((value) => {
      let newIngred: Ingredient = new Ingredient(
        value.Name,
        value.MeasurementType,
        value.WholeAmount,
        value.FractionAmount
      );

      newIngredientArray.push(newIngred);
    });

    return newIngredientArray;
  }

  private convertInstructionsToStringArray(oldStringArray: any): string[]
  {
    let newStringArray = new Array<string>();

    oldStringArray.forEach((value: {Step: string}) => {      

      newStringArray.push(value.Step);
    });

    return newStringArray;
  }

  private convertTagsToStringArray(oldStringArray: any): string[]
  {
    let newStringArray = new Array<string>();

    oldStringArray.forEach((value: {Tag: string}) => {      

      newStringArray.push(value.Tag);
    });

    return newStringArray;
  }
//#endregion Conversion
}
