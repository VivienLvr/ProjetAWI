import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe, RecipeType } from 'src/app/models/recipe';
import { FormGroup, FormControl } from'@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Progression } from 'src/app/models/progression';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe?: Recipe;
  displayForm: boolean = true;
  recipeGroup : FormGroup;
  @Output() submitEvent: EventEmitter<String> = new EventEmitter()
  @Output() addSuccess: EventEmitter<String> = new EventEmitter();
  @Output() modifSuccess: EventEmitter<String> = new EventEmitter();
  categorySelected: String = "";
  types: String[] = [];
  displayNewStage : boolean = true;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { 
    this.recipeGroup = new FormGroup({
      name: new FormControl(),
      author: new FormControl(),
      covers: new FormControl()
    });
  }

  ngOnInit(): void {
    this.types = Object.values(RecipeType);
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
        this.categorySelected = this.recipe.category!;
      }
    });
  }

  ngOnChanges(): void {
    
  }

  
  submit() {
    if(!this.recipe) { 
      console.log("Ajout")
      this.recipe = new Recipe("",
        this.recipeGroup.get('name')!.value,
        this.recipeGroup.get('author')!.value,
        this.recipeGroup.get('covers')!.value, 0, RecipeType.cake, ""
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

  addStage() {
    this.displayNewStage = true;
  }
}
