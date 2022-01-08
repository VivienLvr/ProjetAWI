import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

//import { AngularFireModule } from 'angularfire2';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { IngredientService } from './services/ingredient.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { IngredientItemComponent } from './components/ingredients/ingredient-item/ingredient-item.component';
import { IngredientFormComponent } from './components/ingredients/ingredient-form/ingredient-form.component';
import { RecipeItemComponent } from './components/recipes/recipe-item/recipe-item.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { StageFormComponent } from './components/recipes/stage-form/stage-form.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    IngredientItemComponent,
    IngredientFormComponent,
    RecipeItemComponent,
    HomepageComponent,
    StageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
    IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

