import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ingredient, IngredientType, Unit } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  //ingredientsCollection : AngularFirestoreCollection<Ingredient>;
  ingredients : Ingredient[] = [];
    /*new Ingredient(1, "Pomme", IngredientType.fruit, Unit.piece, 30, 0.5, false), 
    new Ingredient(2, "Steak haché", IngredientType.meat, Unit.kg, 5, 10, false),
    new Ingredient(3, "Riz", IngredientType.epicerie, Unit.kg, 10, 0.5, false)*/
  

  constructor(private ingredientService: IngredientService) { 
    /*this.ingredientsCollection = afs.collection('ingredient');
    console.log(this.ingredientsCollection);
    */
    
  }

  ngOnInit(): void {
    /*this.IngredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    })*/
    this.ingredientService.sayHello();
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });

  }

}
