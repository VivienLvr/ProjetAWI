import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { FormGroup, FormControl } from'@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-Recipe-form',
  templateUrl: './Recipe-form.component.html',
  styleUrls: ['./Recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() Recipe?: Recipe;
  displayForm: boolean = false;
  recipeGroup : FormGroup;
  @Output() cancelEvent: EventEmitter<String> = new EventEmitter()
  @Output() submitEvent: EventEmitter<String> = new EventEmitter()
  @Output() addSuccess: EventEmitter<String> = new EventEmitter();
  @Output() modifSuccess: EventEmitter<String> = new EventEmitter();

  constructor(private RecipeService: RecipeService) { 
    this.recipeGroup = new FormGroup({
      name: new FormControl(),
      author: new FormControl(),
      nbPlates: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.Recipe) {
      this.recipeGroup = new FormGroup({
        name: new FormControl(this.Recipe.name),
        author: new FormControl(this.Recipe.author),
        nbPlates: new FormControl(this.Recipe.nbPlates)
      });
    }
  }

  submit() {
    if(!this.Recipe) { 
      this.Recipe = new Recipe("",
        this.recipeGroup.get('name')!.value,
        this.recipeGroup.get('author')!.value,
        this.recipeGroup.get('nbPlates')!.value
      );
      this.submitEvent.emit("Submited")
    }
    else {
      console.log("Recipe : " + this.Recipe.name)
      console.log("form : " + this.recipeGroup.get('name')!.value);
      this.Recipe.name = this.recipeGroup.get('name')!.value;
      this.Recipe.author = this.recipeGroup.get('author')!.value;
      this.Recipe.nbPlates = this.recipeGroup.get('nbPlates')!.value;
    }
    this.RecipeService.modifyRecipe(this.Recipe).then(msg => {
      console.log("in then modifyRecipe");
      console.log(msg)
      
      switch(msg) {
        case 'addSuccess':
          console.log("case addSuccess");
          this.addSuccess.emit("success")
          break;
        case 'modifSuccess':
          console.log("case modifSuccess");
          this.modifSuccess.emit("success")
          break;
      }
    })
  }

  cancel(): void {
    this.displayForm = false;
    this.cancelEvent.emit("cancel");
  }
}
