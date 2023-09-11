import { Ingredient } from "./ingredients";

export class Recipe {
    public Name: string;
    public Description: string;
    public Ingredients: Ingredient[];
    public Instructions: string[];

    constructor(name: string, description: string, ingredients: Ingredient[], instructions: string[])
    {
        this.Name = name;
        this.Description = description;
        this.Ingredients = ingredients;
        this.Instructions = instructions;
    }

}
