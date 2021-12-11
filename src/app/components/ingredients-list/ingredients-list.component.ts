import { Component, OnInit } from '@angular/core';
import { Ingredient, IngredientType, Unit } from 'src/app/models/ingredient';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  ingredients : Array<Ingredient> = [ 
    new Ingredient(1, "Pomme", IngredientType.fruit, Unit.piece, 30, 0.5, false), 
    new Ingredient(2, "Steak haché", IngredientType.meat, Unit.kg, 5, 10, false),
    new Ingredient(3, "Riz", IngredientType.epicerie, Unit.kg, 10, 0.5, false)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
