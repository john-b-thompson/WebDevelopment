import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const appRoutes: Routes = [
  {path: '', component: RecipeComponent,
    children: [
      {path: 'list', component: RecipeListComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: 'edit/:Id', component: RecipeEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
