import { createReducer, on } from "@ngrx/store";

import { RecipeListAPI } from "./recipe.actions";
import { State } from "src/app/Models/recipeState";

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
    on(RecipeListAPI.setRecipeList, (state, action) => ({
        ...state,
        loading: false,
        recipeList: state.recipeList = action.recipeList
    })),
    on(RecipeListAPI.getRecipeList, (state) => state)
);