import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, lastValueFrom, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Progression } from '../models/progression';
import { Recipe, RecipeType } from '../models/recipe';
import { QuantityIngredient, Stage } from '../models/stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  stageCollection : AngularFirestoreCollection<Stage>;
  stageCollectionDB : AngularFirestoreCollection<StageDB>;
  stages?: Observable<StageDB[]>;
  //stages?: Stage[];
  progression?: Progression;
  
  constructor(public afs: AngularFirestore) { 
    this.stageCollection = afs.collection<Stage>('stage')
    this.stageCollectionDB = afs.collection<StageDB>('stage')
  }
  
  /*getStagesOfProgression(idProg: string) : Observable<Stage[]> {
    
    this.stages = new Observable(subscriber => {
      this.getStagesOfProgressionDB(idProg).subscribe(stages => 
      {
        return stages.forEach(elem => {
          console.log("stage id = " + elem.id);
          let ingredients: QuantityIngredient[];
          const obs = this.afs.collection<QuantityIngredient>('quantiteIngredient', ref => ref.where('isEtape', '==', elem.id)).valueChanges()
          obs.subscribe(ingred =>
            ingredients = ingred
          )
          await lastValueFrom(obs);
          return new Stage(elem.id, elem.title, elem.duration, ingredients)
        })
      }
    )
    )
  }*/

  getStagesOfProgressionDB(idProg: string): Observable<StageDB[]> {
    const id = new BehaviorSubject(idProg);
    let stagesDB = id.pipe(
      switchMap(id =>
        this.afs.collection<StageDB>('stage', ref => ref.where('idProg', '==', id)).valueChanges())
    )
    return stagesDB;
  }

  getIngredients(stageId: string) {

  }
}



class StageDB {
  id: string;
  title : String;
  duration: number; // Stage duration in minutes
  ingredients : Array<QuantityIngredient>;
  idProg: string;

  constructor(id: string, title: String, duration: number, ingredients: Array<QuantityIngredient>, idProg: string) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.ingredients = ingredients;
    this.idProg = idProg;
  }
}