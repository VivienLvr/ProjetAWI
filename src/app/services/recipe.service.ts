import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection : AngularFirestoreCollection<Recipe>;
  recipes : Observable<Recipe[]>;

  recipes1: Recipe[] = [
    /*new Recipe(1, "Pomme", RecipeType.fruit, Unit.piece, 30, 0.5, false), 
    new Recipe(2, "Steak haché", RecipeType.meat, Unit.kg, 5, 10, false),
    new Recipe(3, "Riz", RecipeType.epicerie, Unit.kg, 10, 0.5, false)*/
  ]

  constructor(public afs: AngularFirestore) { 
    this.recipesCollection = afs.collection<Recipe>('recipe')
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(recipes => recipes.map(i => {
       let recipe: Recipe = i.payload.doc.data();
       recipe.id = i.payload.doc.id;
       return recipe;
      }))
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes;
  }

  sayHello(): void {
    console.log("Hello");
  }

  async addRecipe(i : Recipe): Promise<String> {
    try {
      await this.recipesCollection.add({...i})
      console.log("recipe added !!" + i)
      return "addSuccess";
    }
    catch(error) {
      console.log(error)
      return "addFailure";
    }
  }

  async modifyRecipe(i : Recipe): Promise<String> {
    // adding an recipe
    if(i.id == "") {
      return await this.addRecipe(i);
    }
    else {
      try {
        await this.recipesCollection.doc(i.id).update(i);
        console.log("recipe modified !!" + i)
        return "modifSuccess";
      }
      catch(error) {
        console.log(error);
        return "modifFailure";
      }
    }
  }

  async delete(i: Recipe) {
    await this.recipesCollection.doc(i.id).delete();
  }
}
