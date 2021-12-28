import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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
}
