import { Component, OnInit } from '@angular/core';
import { Ingredient, IngredientType, Unit } from 'src/app/models/ingredient';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  ingredient?: Ingredient;
  units: String[] = [];
  types: String[] = [];

  constructor() { }

  ngOnInit(): void {
    this.units = Object.values(Unit);
    this.types = Object.values(IngredientType);
  }

}
