import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Recipe } from "src/app/Models/recipe";

export const RecipeListAPI = createActionGroup({
    source: 'Recipe List API',
    events: {
        'Save Recipe List': props<{recipeList: Recipe[]}>(),
        'Save Recipe': props<{recipe: Recipe}>(),
        'Get Recipe List': emptyProps(),
        'Set Recipe List': props<{recipeList: Recipe[]}>()
    }
});