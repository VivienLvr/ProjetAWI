import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, of, Subscription } from 'rxjs';
import { Progression } from '../models/progression';
import { Recipe, RecipeType } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollectionDB : AngularFirestoreCollection<RecipeDB>;
  recipesCollection : AngularFirestoreCollection<Recipe>;
  recipes? : Observable<Recipe[]>;
  progression?: Progression;
  
  constructor(public afs: AngularFirestore) { 
    this.recipesCollectionDB = afs.collection<RecipeDB>('recipe')
    this.recipesCollection = afs.collection<Recipe>('recipe')
  }
  
  getRecipes(): Observable<Recipe[]> {
    this.recipes = this.recipesCollectionDB.snapshotChanges().pipe(
      map(recipes => recipes.map(r => {
        let recipeDB: RecipeDB = r.payload.doc.data();
        let recipe: Recipe;
        recipeDB.id = r.payload.doc.id;
        
        const idProgression = r.payload.doc.data().progression;
        console.log(idProgression);
        if(idProgression) {
          this.getProgression(idProgression).subscribe(prog => {
            this.progression = prog!
            this.progression.id = idProgression;
            console.log(this.progression.duration);
              
          });
          recipe = new Recipe(recipeDB.id, recipeDB.name, recipeDB.author, recipeDB.covers, this.progression!, recipeDB.priceCoef, 
          recipeDB.category)
          return recipe;
        }
        else {
          // no progression for this recipe
          console.log("no progression for this recipe");
          recipe = new Recipe(recipeDB.id, recipeDB.name, recipeDB.author, recipeDB.covers, new Progression("","",[],0,[]), recipeDB.priceCoef, 
          recipeDB.category)
          return recipe;
        }
      }))
    );
    return this.recipes!;
  }

  getProgression(id : string): Observable<Progression | undefined> {
    let progression: Observable<Progression | undefined>;
    const itemDoc = this.afs.collection<Progression>('progression').doc(`${id}`)
    progression = itemDoc.valueChanges();
    
    return progression;
  }

  async addRecipe(r : RecipeDB): Promise<String> {
    try {
      await this.recipesCollectionDB.add({...r})
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
    let recipe: RecipeDB = new RecipeDB(r.id, r.name, r.author, r.covers, r.priceCoef, r.category, r.progression.id);
    // adding an recipe
    if(r.id == "") {
      return await this.addRecipe(recipe);
    }
    else {
      try {
        await this.recipesCollectionDB.doc(r.id).update({...recipe});
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

  updateProgression(p: Progression) {
    try {
      this.recipesCollection.doc(p.id).update(p);
      console.log("progression modified !!")
    }
    catch(error) {
      console.log(error);
    }
  }

}
class RecipeDB {
  id : string;
  name : String;
  author : String;
  covers : number;
  priceCoef? : number;
  category? : RecipeType;
  progression? : string;

  constructor(id: string, name : String,
      author : String,
      covers : number,
      priceCoef? : number,
      category? : RecipeType,
      progression? : string) {
          this.id = id;
          this.name = name;
          this.author = author;
          this.covers = covers;
          this.priceCoef = priceCoef;
          this.category = category;
          this.progression = progression;
      }
}
