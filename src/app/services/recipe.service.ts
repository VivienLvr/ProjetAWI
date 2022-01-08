import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, of, Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection : AngularFirestoreCollection<Recipe>;
  recipes : Observable<Recipe[]>;
  
  constructor(public afs: AngularFirestore) { 
    this.recipesCollection = afs.collection<Recipe>('recipe')
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(recipes => recipes.map(r => {
       let recipe: Recipe = r.payload.doc.data();
       recipe.id = r.payload.doc.id;
       return recipe;
      }))
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes;
  }

  async addRecipe(r : Recipe): Promise<String> {
    try {
      await this.recipesCollection.add({...r})
      console.log("recipe added !!" + r)
      return "addSuccess";
    }
    catch(error) {
      console.log(error)
      return "addFailure";
    }
  }

  /*getRecipe(id: string) : Subscription {
    let recipe: Subscription;
    try {
      const recipeDoc = this.afs.doc<Recipe>(`recipe/${id}`);
      recipe = recipeDoc.valueChanges().subscribe();
      return recipe;
    }
    catch(error) {
      console.log(error);
    }
  }*/

  async modifyRecipe(r : Recipe): Promise<String> {
    // adding an recipe
    if(r.id == "") {
      return await this.addRecipe(r);
    }
    else {
      try {
        await this.recipesCollection.doc(r.id).update(r);
        console.log("recipe modified !!" + r)
        return "modifSuccess";
      }
      catch(error) {
        console.log(error);
        return "modifFailure";
      }
    }
  }

  async delete(r: Recipe) {
    await this.recipesCollection.doc(r.id).delete();
  }
}
