import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/Models/ingredients';
import { Recipe } from 'src/app/Models/recipe';
import { State } from 'src/app/Models/recipeState';
import { selectRecipeList } from 'src/app/Store/Recipe/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  loadedModal: string = '';
  modalRecipe: Recipe = {} as Recipe;

  recipeList: Recipe[] = [];

  fakeIngreds: Ingredient[] = [
    new Ingredient('Beef', 'Pound', '1/2'),
    new Ingredient('Cheese', 'Ounce', '2')
  ];

  fakeInstructions: string[] = [
    'Make a patty out of the meat.',
    'Put some oil in bottom of pan and let it heat up. This will give us a nice sear and help cook the meat.',
    'After 3 minutes of cooking on each side pull out and let rest.',
    'Place cheese on and serve.'
  ];
  
  fakeRecipeList: Recipe[] = [
    new Recipe('CheeseBurger', 'Tasty thick piece of meat with cheese and a bun.',
    this.fakeIngreds, this.fakeInstructions)
  ];

  constructor(private recipeStore: Store<State>) {}

  ngOnInit(): void {
    this.recipeStore.select(selectRecipeList).subscribe(
      (recipeList) => {
          console.log(recipeList);
          if (recipeList.length !== 0 )
          {
            this.recipeList = recipeList;
          }
          else
          {
            this.recipeList = this.fakeRecipeList;
          }
        }
      
    );
  }

  onLoad(recipeId: number)
  {
    this.modalRecipe = this.recipeList[recipeId];
  }

  onEdit()
  {

  }

}
