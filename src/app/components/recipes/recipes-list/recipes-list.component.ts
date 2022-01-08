import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    })
  }
  
  redirectModif(recipe : Recipe) {
    this.router.navigateByUrl(`/recette/${recipe.id}`);
  }

  redirectAddRecipe() {
    this.router.navigateByUrl('/nouvelle-recette');
  }
}
