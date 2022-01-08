import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { FormGroup, FormControl } from'@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Recipe-form',
  templateUrl: './Recipe-form.component.html',
  styleUrls: ['./Recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe?: Recipe;
  displayForm: boolean = true;
  recipeGroup : FormGroup;
  @Output() submitEvent: EventEmitter<String> = new EventEmitter()
  @Output() addSuccess: EventEmitter<String> = new EventEmitter();
  @Output() modifSuccess: EventEmitter<String> = new EventEmitter();

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { 
    this.recipeGroup = new FormGroup({
      name: new FormControl(),
      author: new FormControl(),
      covers: new FormControl()
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipes().subscribe(recipes => {
      recipes.forEach(recipe => {
        if(recipe.id == id) { this.recipe = recipe }
      })

      if(this.recipe) {
        console.log("hello")
        this.recipeGroup = new FormGroup({
          name: new FormControl(this.recipe.name),
          author: new FormControl(this.recipe.author),
          covers: new FormControl(this.recipe.covers)
        });
      }
      console.log("recipe.name : "  + this.recipe!.name);
      console.log("recipe.id : "  + this.recipe!.id);
    });
  }

  ngOnChanges(): void {
    
  }

  
  submit() {
    if(!this.recipe) { 
      this.recipe = new Recipe("",
        this.recipeGroup.get('name')!.value,
        this.recipeGroup.get('author')!.value,
        this.recipeGroup.get('covers')!.value
      );
      this.submitEvent.emit("Submited")
    }
    else {
      console.log("Recipe : " + this.recipe.name)
      console.log("form : " + this.recipeGroup.get('name')!.value);
      this.recipe.name = this.recipeGroup.get('name')!.value;
      this.recipe.author = this.recipeGroup.get('author')!.value;
      this.recipe.covers = this.recipeGroup.get('covers')!.value;
    }
    this.recipeService.modifyRecipe(this.recipe).then(msg => {
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
    this.router.navigateByUrl('/recettes');
  }

  cancel(): void {
    this.displayForm = false;
    this.router.navigateByUrl("/recettes");
  }
}
