import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

declare var html2pdf: any;

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

  download(): void {
    const element = document.getElementById('pdf');
    var opt = {
      margin: 1,
      filename: `${this.recipe!.name}.pdf`
    };
    html2pdf().from(element).set(opt).save();
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
