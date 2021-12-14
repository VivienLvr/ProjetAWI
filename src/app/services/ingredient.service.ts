import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ingredient, IngredientType, Unit } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredientsCollection : AngularFirestoreCollection<Ingredient>;
  ingredients : Observable<Ingredient[]>;

  ingredients1: Ingredient[] = [
    /*new Ingredient(1, "Pomme", IngredientType.fruit, Unit.piece, 30, 0.5, false), 
    new Ingredient(2, "Steak haché", IngredientType.meat, Unit.kg, 5, 10, false),
    new Ingredient(3, "Riz", IngredientType.epicerie, Unit.kg, 10, 0.5, false)*/
  ]

  constructor(public afs: AngularFirestore) { 
    this.ingredientsCollection = afs.collection<Ingredient>('ingredient')
    this.ingredients = this.ingredientsCollection.valueChanges();
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients;
  }

  sayHello(): void {
    console.log("Hello");
  }

  addIngredient(i : Ingredient) {
    this.ingredientsCollection.add(i);
  }
}
