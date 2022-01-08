import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './components/ingredients/ingredients-list/ingredients-list.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { IngredientFormComponent } from './components/ingredients/ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component : HomepageComponent },
  { path : 'ingredients', component : IngredientsListComponent },
  { path : 'recettes', component : RecipesListComponent },
  { path : 'recette/:id', component : RecipeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ IngredientsListComponent, RecipesListComponent, IngredientFormComponent, RecipeFormComponent, HomepageComponent ]