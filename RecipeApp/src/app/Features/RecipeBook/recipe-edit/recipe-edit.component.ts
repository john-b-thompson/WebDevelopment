import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Fractions } from 'src/app/Models/fractions';
import { Ingredient } from 'src/app/Models/ingredients';
import { MeasurementType } from 'src/app/Models/mesaruementType';
import { Recipe } from 'src/app/Models/recipe';
import { State } from 'src/app/Models/recipeState';
import { Tags } from 'src/app/Models/tags';
import { RecipeService } from 'src/app/Services/recipe.service';
import { RecipeListAPI } from 'src/app/Store/Recipe/recipe.actions';
import { selectRecipeList } from 'src/app/Store/Recipe/recipe.selectors';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  measurementType: string[] = new MeasurementType().allMeasurementTypes();
  fractionMeasurement: string[] = new Fractions().allFractions();
  tags: string[] = new Tags().allTags();

  isEditing: boolean = false;
  recipeForm: FormGroup = new FormGroup({});
  recipeId: number = 0;

  // create a editable recipe to work with to make things easier to work with
  selectedRecipe: Recipe = {} as Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              private router: Router)
  {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let paramId = params['Id'];
      if (paramId != null || paramId != undefined)
      {        
        this.recipeId = parseInt(paramId);
        this.isEditing = true;
      }
    });

    this.selectedRecipe = this.setupOfSelectedRecipe();
    this.createRecipeForm(this.selectedRecipe);
  }

  private createRecipeForm(recipe: Recipe)
  {
    this.recipeForm = new FormGroup({
      'Name': new FormControl(recipe.Name, Validators.required),
      'Tags': this.createStringFormArray(recipe.Tags, 'Tags'),
      'Description': new FormControl(recipe.Description, Validators.required),
      'Ingredients': this.createIngredientFormArray(recipe.Ingredients),
      'Instructions': this.createStringFormArray(recipe.Instructions, 'Instructions')
    });
  }

  private setupOfSelectedRecipe(): Recipe
  {
    let selectedRecipe: Recipe = {} as Recipe;

    if (this.isEditing)
    {
      selectedRecipe = this.recipeService.getRecipe(this.recipeId);
    }

    return selectedRecipe;
  }

  //#region IngredientsFormArray 
    private createIngredientFormArray(ingredients: Ingredient[]): FormArray<FormGroup>
    {
      let ingredientFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
      
      if ( (ingredients != undefined) || (ingredients != null))
      {
        if (ingredients.length > 0)
        {
          for (let ingred of ingredients)
          {
            ingredientFormArray.push(this.createIngredientFormGroup(ingred));
          }  
        }  
        else
        {
          ingredientFormArray.push(this.createIngredientFormGroup({} as Ingredient));
        }        
      }
      else
      {
        ingredientFormArray.push(this.createIngredientFormGroup({} as Ingredient));
      }

      return ingredientFormArray;
    }
    
    // Will create the FormGroup for Ingredients to be used in multiple places.
    // This will keep it from being created manually in each place to reduce errors.
    private createIngredientFormGroup(ingredient: Ingredient): FormGroup
    {
      let formGroupControl: FormGroup; 
      
      formGroupControl = new FormGroup({
        'Name': new FormControl(ingredient.Name, Validators.required),
        'WholeAmount': new FormControl(ingredient.WholeAmount, Validators.pattern(/^[1-9]+[0-9]*$/)),
        'FractionAmount': new FormControl(ingredient.FractionAmount, Validators.required),
        'MeasurementType': new FormControl(ingredient.MeasurementType, Validators.required)
      });

      return formGroupControl;
    }

    // This will add another Ingredient to the Recipe
    onAddIngredient()
    {
      let formGroup = this.createIngredientFormGroup({} as Ingredient);

      // this needs to be done this way to so we can actually push 
      (<FormArray>this.recipeForm.get('Ingredients')).push(formGroup);
    }
  //#endregion IngredientFormArray
  
  // Will create the FormGroup for Instructions to be used in multiple places.
  // This will keep it from being created manually in each place to reduce errors.
  private createInstructionFormGroup(step: string): FormGroup
  {
    let formGroupControl: FormGroup; 

    formGroupControl = new FormGroup({
          'Step': new FormControl(step, Validators.required)
        });

    return formGroupControl;
  }

  // Will create the FormGroup for Tags to be used in multiple places.
  // This will keep it from being created manually in each place to reduce errors.
  private createTagFormGroup(tag: string): FormGroup
  {
    let formGroupControl: FormGroup; 

    formGroupControl = new FormGroup({
          'Tag': new FormControl(tag, Validators.required)
        });

    return formGroupControl;
  }
  
  //#region StringFormArray
    // This will create the FormArray for Strings to help cut back on errors.
    private createStringFormArray(array: string[], formGroupName: string): FormArray<FormGroup>
    {
      let newFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
      
      if ((array != undefined) || (array != null))
      {
        if (array.length > 0)
        {
          for (let value of array)
          {
            newFormArray.push(this.getStringFormGroup(formGroupName, value));
          }  
        }      
        else
        {          
          newFormArray.push(this.getStringFormGroup(formGroupName, ''));
        }    
      }
      else
      {
        newFormArray.push(this.getStringFormGroup(formGroupName, ''));
      }

      return newFormArray;
    }

    private getStringFormGroup(formGroupName: string, formControlValue: string): FormGroup
    {
      let formGroup: FormGroup<any>;

      switch(formGroupName.toLowerCase())
      {
        case 'tags': 
        {
          formGroup = this.createTagFormGroup(formControlValue);
          break;
        }
        case 'instructions': 
        {
          formGroup = this.createInstructionFormGroup(formControlValue);
          break;
        }
        default: 
        {
          formGroup = this.createTagFormGroup(formControlValue);
          break;
        }
      }

      return formGroup;
    }

    // This will add another string FormGroup to the passed in ArrayForm
    onAddExtraStringFormGroup(formGroupName: string)
    {
      let formGroup = this.getStringFormGroup(formGroupName,'');

      // this needs to be done this way to so we can actually push 
      (<FormArray>this.recipeForm.get(formGroupName)).push(formGroup);
    }
  //#endregion StringFormArray

  // This will remove the selected FormControl from FormArray passed in.
  public onDelete(index: number, formArrayName: string)
  {
    // this needs to be done this way to so we can actually remove
    // the selected Tag.
    (<FormArray>this.recipeForm.get(formArrayName)).removeAt(index);
  }

  // Returns all controls in the passed in FormArray to be displayed.
  public getControls(formArrayName: string)
  {
    return (this.recipeForm.get(formArrayName) as FormArray).controls;
  }

  // Checks to see if the value being passed in has a value so that
  // the html knows what text to display.
  public hasValue(value: any): boolean
  {
    let hasValue = false;

    if (value !== null && value !== undefined)
    {
      hasValue = true;
    }

    return hasValue;
  }
 
  public onSubmit()
  {
    if (this.isEditing)
    {      
      this.isEditing = false;
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    }
    else
    {      
      this.recipeService.saveRecipe(this.recipeForm.value);
    }
    
    this.recipeForm.reset();

    this.router.navigate(['recipe/list']);
  }
}
