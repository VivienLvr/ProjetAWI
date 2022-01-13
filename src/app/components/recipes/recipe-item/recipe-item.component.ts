import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

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
  displayApercu: boolean = false;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  displayApercuClicked() {
    if(this.displayApercu) {
      this.displayApercu = false;
    }
    else { this.displayApercu = true; }
  }

  download(): void {
    if(this.recipe) {
      const element = document.getElementById(this.recipe.name.toString());
      //element?.classList.remove('hide')
      this.displayApercu = true;
      var opt = {
        margin: 1,
        filename: `${this.recipe!.name}.pdf`
      };
      html2pdf().from(element).set(opt).save();
    }
  }

  modify() {
    console.log("Modify recipe : " + this.recipe);
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
