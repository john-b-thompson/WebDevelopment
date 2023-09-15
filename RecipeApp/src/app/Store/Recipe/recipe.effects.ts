import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecipeListAPI } from "./recipe.actions";
import { exhaustMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Recipe } from "src/app/Models/recipe";


@Injectable()
export class RecipeEffects 
{
    private recipeListKey = 'recipeList';
    constructor(private actions$: Actions) {}

    saveRecipeList = createEffect(() => this.actions$.pipe(
        ofType(RecipeListAPI.saveRecipeList),
        tap((action) => {
            localStorage.setItem(this.recipeListKey, JSON.stringify(action.recipeList))
        })
    ));

    loadRecipeList$ = createEffect(() => this.actions$.pipe(
        ofType(RecipeListAPI.getRecipeList),
        exhaustMap(() => {
            let storedRecipeList = localStorage.getItem(this.recipeListKey);

            if (storedRecipeList != null || storedRecipeList != undefined)
            {
                let parsedArray: [] = JSON.parse(storedRecipeList);
                return of(RecipeListAPI.setRecipeList({ recipeList: parsedArray}));
            }

            return of(RecipeListAPI.setRecipeList({recipeList: []}));
        })
    ));
}