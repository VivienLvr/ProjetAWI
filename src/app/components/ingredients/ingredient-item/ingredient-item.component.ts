import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient?: Ingredient;
  @Output() modifyEvent: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  modify() {
    console.log("Modify ingre : " + this.ingredient);
    this.modifyEvent.emit(this.ingredient);
  }

}
