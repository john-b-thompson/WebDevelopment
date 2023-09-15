import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';

const appRoutes: Routes = [
  {path: '', component: RecipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
