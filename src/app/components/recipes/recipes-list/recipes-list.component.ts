import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, IngredientType, Unit } from 'src/app/models/ingredient';
import { Progression } from 'src/app/models/progression';
import { Recipe } from 'src/app/models/recipe';
import { QuantityIngredient, Stage } from 'src/app/models/stage';
import { StageDescription } from 'src/app/models/stage-description';
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
  private SaintHonore: Recipe;
  
  constructor(private recipeService: RecipeService, private router: Router) { 
    this.searchGroup = new FormGroup({
      search: new FormControl()
    })
    this.SaintHonore = this.initSaintHonore();
  }
  
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.recipes.push(this.SaintHonore);
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
      recipes.push(this.SaintHonore)
      const filterName = this.searchGroup.get('search')!.value.toLowerCase();
      console.log(filterName);
      this.recipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(filterName))
      console.log(this.recipes)
    })
  }

  initSaintHonore(): Recipe {
    let ingredients1: QuantityIngredient[] = [];
    let ingredients2: QuantityIngredient[] = [];
    
    ingredients1.push(new QuantityIngredient(new Ingredient("", "Plaques de feuillage", IngredientType.epicerie , Unit.piece, 0, 1, false), 1))
    ingredients1.push(new QuantityIngredient(new Ingredient("", "Eau", IngredientType.epicerie , Unit.litre, 0, 1, false), 0.25))
    ingredients1.push(new QuantityIngredient(new Ingredient("", "Sel fin", IngredientType.epicerie , Unit.kg, 0, 1, false), 0.005))
    ingredients1.push(new QuantityIngredient(new Ingredient("", "Sucre semoule", IngredientType.epicerie , Unit.kg, 0, 1, false), 0.01))
    ingredients2.push(new QuantityIngredient(new Ingredient("", "Lait", IngredientType.epicerie , Unit.litre, 0, 1, false), 0.5))
    ingredients2.push(new QuantityIngredient(new Ingredient("", "Jaunes", IngredientType.epicerie , Unit.piece, 0, 1, false), 4))

    let stages: StageDescription[] = [];
    stages.push(new StageDescription("", "Mise en place du poste de travail", 1, 5))
    stages.push(new StageDescription("", "R??aliser les pes??es", 2,  10))
    stages.push(new StageDescription("", "R??aliser la base du Saint-Honor??",3, 30, ingredients1, 
    `
    - R??aliser la pate ?? choux
    - D??couper un disque de pate feuillet??e, le piquer des deux cot??s
    ...`
))
    stages.push(new StageDescription("", "R??aliser la cr??me Chiboust", 4, 30, ingredients2, 
    `- R??aliser une cr??me patissi??re, la coller ?? l'aide de la g??latine
    `))
    let recipe = new Recipe("", "Saint-Honor??", "P??tissier", 10, new Progression("", "Saint-Honor??", [], 95, stages))
    return recipe;
  }
}
