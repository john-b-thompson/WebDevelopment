import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/Models/ingredients';
import { Recipe } from 'src/app/Models/recipe';
import { State } from 'src/app/Models/recipeState';
import { RecipeService } from 'src/app/Services/recipe.service';
import { selectRecipeList } from 'src/app/Store/Recipe/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  loadedModal: string = '';
  modalRecipe: Recipe = {} as Recipe;
  currentRecipeId: number = 0;


  recipeList: Recipe[] = [];

  fakeIngreds: Ingredient[] = [
    new Ingredient('Beef', 'Pound', '0', '1/2'),
    new Ingredient('Cheese', 'Ounce', '2', '1/2')
  ];

  fakeInstructions: string[] = [
    'Make a patty out of the meat.',
    'Put some oil in bottom of pan and let it heat up. This will give us a nice sear and help cook the meat.',
    'After 3 minutes of cooking on each side pull out and let rest.',
    'Place cheese on and serve.'
  ];

  fakeTags: string[] = [];
  
  fakeRecipeList: Recipe[] = [
    new Recipe('CheeseBurger', 'Tasty thick piece of meat with cheese and a bun.',
    this.fakeIngreds, this.fakeInstructions, this.fakeTags)
  ];

  constructor(private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeList = this.recipeService.GetRecipeList();
    
    if (this.recipeList.length == 0 )
    {
      this.recipeList = this.fakeRecipeList;
    }
  }

  onLoad(recipeId: number)
  {
    this.currentRecipeId = recipeId;
    this.modalRecipe = this.recipeList[this.currentRecipeId];
  }

  onEdit()
  {
    this.router.navigate(['recipe/edit', this.currentRecipeId]);
  }

}
