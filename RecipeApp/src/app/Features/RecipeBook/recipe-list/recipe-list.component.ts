import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/Models/ingredients';
import { Recipe } from 'src/app/Models/recipe';
import { State } from 'src/app/Models/recipeState';
import { Tags } from 'src/app/Models/tags';
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
  unAlteredRecipeList: Recipe[] = [];
  filterTags: string[] = [];
  selectedFilterTags: string[] = [];

  searchForm: FormGroup = new FormGroup({});

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

  fakeTags: string[] = ['Keto', 'Gluten Free', 'Sugar Free'];
  
  fakeRecipeList: Recipe[] = [
    new Recipe('CheeseBurger', 'Tasty thick piece of meat with cheese and a bun.',
    this.fakeIngreds, this.fakeInstructions, this.fakeTags)
  ];

  constructor(private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.unAlteredRecipeList = this.recipeService.getRecipeList();
    this.recipeList = this.unAlteredRecipeList;
    this.filterTags = new Tags().allTags();

    this.createForms();

    // remove this when complete
    if (this.recipeList.length == 0 )
    {
      for(let i = 0; i < 100; i++)
      {
        this.unAlteredRecipeList.push(new Recipe('CheeseBurger', 'Tasty thick piece of meat with cheese and a bun.',
        this.fakeIngreds, this.fakeInstructions, this.fakeTags));
      }
    }

    
    this.recipeList = this.unAlteredRecipeList;
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

  // Will search the list of recipes names to find matching values
  onSearch()
  {
    let lowerCaseQuery : string = this.searchForm.get('Search')?.value.toLowerCase(); 
    this.recipeList = this.unAlteredRecipeList.filter((recipe) => recipe.Name.toLowerCase().includes(lowerCaseQuery));
  }

  onFilterChange(event: any)
  {    
    let filterTag = event.target.value;

    if(event.target.checked)
    {
      this.selectedFilterTags.push(filterTag)
      this.recipeList = this.recipeList.filter((recipe) => recipe.Tags.includes(filterTag));
    }
    else
    {
      if (this.selectedFilterTags.includes(filterTag))
      {
        let index = this.selectedFilterTags.indexOf(filterTag);
        this.selectedFilterTags = this.selectedFilterTags.slice(index, 1); 
      }
    }
  }

  private createForms()
  {    
    this.searchForm = new FormGroup({
      'Search': new FormControl<string>('', Validators.pattern(/^[a-z0-9_-]{8,15}$/))
    });
  }

  // TODO: Need to creat this
  // Will seperate the list and create pagination.
  seperateRecipeList(int: number)
  {

  }

}
