import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

const routes: Routes = [
  { path : 'ingredients', component : IngredientsListComponent },
  { path : 'recettes', component : RecipesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ IngredientsListComponent, RecipesListComponent ]