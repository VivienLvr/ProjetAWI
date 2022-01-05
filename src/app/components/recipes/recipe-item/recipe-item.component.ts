import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Output() modifyEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  confirmDelete: boolean = false;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  modify() {
    console.log("Modify ingre : " + this.recipe);
    this.modifyEvent.emit(this.recipe);
  }

  delete() {
    if(!this.recipe) {
      return
    }
    if(this.confirmDelete) {
      this.recipeService.delete(this.recipe);
      this.confirmDelete = false;
    }
    else {
      this.confirmDelete = true;
    }
  }

}
