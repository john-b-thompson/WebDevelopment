import { Ingredient } from "./ingredients";

export class Recipe {
    public Name: string;
    public Description: string;
    public Ingredients: Ingredient[];
    public Instructions: string[];
    public Tags: string[];

    constructor(name: string, description: string, ingredients: Ingredient[], instructions: string[], tags: string[])
    {
        this.Name = name;
        this.Description = description;
        this.Ingredients = ingredients;
        this.Instructions = instructions;
        this.Tags = tags;
    }

}
