import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Recipe } from "src/app/Models/recipe";
import { State } from "src/app/Models/recipeState";

const getRecipeList = createFeatureSelector<State>('recipeList');

export const selectRecipeList = createSelector(
    getRecipeList,
    (state) => { return state.recipeList; }
);