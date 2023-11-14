import { createReducer, on } from "@ngrx/store";

import { RecipeListAPI } from "./recipe.actions";
import { State } from "src/app/Models/recipeState";
import { Recipe } from "src/app/Models/recipe";

export const initState: State = {
    loading: true,
    recipeList: [],
    userAccount: {}
}

export const recipeListReducer = createReducer(
    initState,
    on(RecipeListAPI.saveRecipeList, (state, action) =>  ({
        ...state,
        loading: false,
        recipeList: state.recipeList = action.recipeList
    })),
    on(RecipeListAPI.saveRecipe, (state, action) => ({
        ...state,
        loading: false,
        recipeList: [...state.recipeList, action.recipe]
    })),
    on(RecipeListAPI.updateRecipe, (state, action) => ({
        ...state,
        loading: false,
        // figure out how to fix this
        //recipeList: [...state.recipeList, state.recipeList[action.recipeId] = action.recipe]
        recipeList: [...state.recipeList.map( recipe => {
            let newRecipe = recipe;
            if (recipe.Name == action.recipe.Name)
            {
                newRecipe = action.recipe;
            }
            return newRecipe;
        })]
    })),
    on(RecipeListAPI.setRecipeList, (state, action) => ({
        ...state,
        loading: false,
        recipeList: [...state.recipeList]
    })),
    on(RecipeListAPI.getRecipeList, (state) => state)
);