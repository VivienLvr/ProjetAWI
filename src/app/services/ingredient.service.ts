import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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
    this.ingredients = this.ingredientsCollection.snapshotChanges().pipe(
      map(ingredients => ingredients.map(i => {
       let ingredient: Ingredient = i.payload.doc.data();
       ingredient.id = i.payload.doc.id;
       return ingredient;
      }))
    );
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients;
  }

  sayHello(): void {
    console.log("Hello");
  }

  async addIngredient(i : Ingredient): Promise<String> {
    try {
      await this.ingredientsCollection.add({...i})
      console.log("ingredient added !!" + i)
      return "addSuccess";
    }
    catch(error) {
      console.log(error)
      return "addFailure";
    }
  }

  async modifyIngredient(i : Ingredient): Promise<String> {
    // adding an ingredient
    if(i.id == "") {
      return await this.addIngredient(i);
    }
    else {
      try {
        await this.ingredientsCollection.doc(i.id).update(i);
        console.log("ingredient modified !!" + i)
        return "modifSuccess";
      }
      catch(error) {
        console.log(error);
        return "modifFailure";
      }
    }
  }
}
