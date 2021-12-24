import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient, IngredientType, Unit } from 'src/app/models/ingredient';
import { FormGroup, FormControl } from'@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  @Input() ingredient?: Ingredient;
  units: String[] = [];
  types: String[] = [];
  ingredientGroup : FormGroup = new FormGroup({});
  displayForm: boolean = false;
  @Output() cancelEvent: EventEmitter<String> = new EventEmitter()
  categorySelected: String = "";
  unitSelected: String = "";

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.units = Object.values(Unit);
    this.types = Object.values(IngredientType);
  }

  ngOnChanges(): void {
    if(this.ingredient) {
      this.ingredientGroup = new FormGroup({
        name: new FormControl(this.ingredient.name),
        category: new FormControl(this.ingredient.category),
        unit: new FormControl(this.ingredient.unit),
        stock: new FormControl(this.ingredient.stock),
        unitPrice: new FormControl(this.ingredient.unitPrice),
        isAlergen: new FormControl(this.ingredient.isAlergen)
      });
      this.categorySelected = this.ingredient.category;
      console.log(this.ingredient.name);
      console.log(this.ingredient.category);
      this.unitSelected = this.ingredient.unit;
    }
  }

  submitIngre() {
    if(!this.ingredient) { return }
    this.ingredient.name = this.ingredientGroup.get('name')!.value;
    this.ingredient.category = this.ingredientGroup.get('category')!.value;
    this.ingredient.unit = this.ingredientGroup.get('unit')!.value;
    this.ingredient.stock = this.ingredientGroup.get('stock')!.value;
    this.ingredient.unitPrice = this.ingredientGroup.get('unitPrice')!.value;
    this.ingredient.isAlergen = this.ingredientGroup.get('isAlergen')!.value;
  }

  cancel(): void {
    this.displayForm = false;
    this.cancelEvent.emit("cancel");
  }
}
