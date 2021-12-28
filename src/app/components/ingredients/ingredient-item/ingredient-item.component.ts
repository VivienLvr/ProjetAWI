import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service'

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient?: Ingredient;
  @Output() modifyEvent: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  confirmDelete: boolean = false;
  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
  }

  modify() {
    console.log("Modify ingre : " + this.ingredient);
    this.modifyEvent.emit(this.ingredient);
  }

  delete() {
    if(!this.ingredient) {
      return
    }
    if(this.confirmDelete) {
      this.ingredientService.delete(this.ingredient);
      this.confirmDelete = false;
    }
    else {
      this.confirmDelete = true;
    }
  }

}
