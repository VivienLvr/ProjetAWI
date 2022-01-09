import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe, RecipeType } from 'src/app/models/recipe';
import { FormGroup, FormControl } from'@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Progression } from 'src/app/models/progression';
import { QuantityIngredient, Stage } from 'src/app/models/stage';
import { StageDescription } from 'src/app/models/stage-description';

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
  isNewStageVisible : boolean = false;
  modifDuration : boolean = false;

  durationGroup: FormGroup;
  stages: StageDescription[] = [
    new StageDescription("", "First stage", 10, [new QuantityIngredient()], "Voici la description de l'étape")
  ];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { 
    this.recipeGroup = new FormGroup({
      name: new FormControl(),
      author: new FormControl(),
      covers: new FormControl(),
      category: new FormControl(),
    });

    this.durationGroup = new FormGroup({
      duration: new FormControl()
    })
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
          covers: new FormControl(this.recipe.covers),
          category: new FormControl(this.recipe.category)
        });
        this.categorySelected = this.recipe.category!;
        console.log(this.recipe.name);
        console.log(this.recipe.progression.title);
        console.log(this.recipe.progression.duration);
        
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
        this.recipeGroup.get('covers')!.value, new Progression("", this.recipeGroup.get('name')!.value, [], 0, this.stages), 0, RecipeType.cake
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
          this.addSuccess.emit("success")
          break;
        case 'modifSuccess':
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

  displayNewStage() {
    this.isNewStageVisible = true;
  }

  hideNewStage() {
    this.isNewStageVisible = false;
  }

  addStage(stage: StageDescription) {
    this.stages.push(stage);
    this.isNewStageVisible = false;
  }

  modifStage(stages: StageDescription[]) {
    const oldStage = stages[0];
    const newStage = stages[1];
    const index = this.stages.findIndex(elem => elem == oldStage);
    this.stages[index] = newStage;
  }

  deleteStage(stage: StageDescription) {
    const index = this.stages.findIndex(elem => elem == stage);
    this.stages.splice(index);
    console.log("elem n°" + index + " deleted");
  }

  modifyDuration() {
    if(this.recipe) {
      this.recipe!.progression.duration = this.durationGroup.get('duration')?.value;
    }
  }
}
