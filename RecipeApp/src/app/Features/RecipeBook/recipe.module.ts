import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
  declarations: [
    RecipeEditComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RecipeRoutingModule,
    ReactiveFormsModule
  ]
})

export class RecipeModule { }
