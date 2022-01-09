import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  searchGroup: FormGroup;
  filterName: string = "";
  
  constructor(private recipeService: RecipeService, private router: Router) { 
    this.searchGroup = new FormGroup({
      search: new FormControl()
    })
  }

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

  search() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      const filterName = this.searchGroup.get('search')!.value.toLowerCase();
      console.log(filterName);
      this.recipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(filterName))
      console.log(this.recipes)
    })
  }
}
