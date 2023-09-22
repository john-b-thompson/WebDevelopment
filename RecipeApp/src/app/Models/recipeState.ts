import { Recipe } from "./recipe";

export interface State {
    loading: boolean,
    recipeList: Recipe[],
    userAccount: {}
};
