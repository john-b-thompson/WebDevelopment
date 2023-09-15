import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'recipe', 
    loadChildren: () => import('./Features/RecipeBook/recipe.module').then(module => module.RecipeModule)},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
