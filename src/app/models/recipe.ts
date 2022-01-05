import { Progression } from "./progression";

enum RecipeType {
    cake = "Gateau",
    sauce = "Sauce"
}

export class Recipe {
    id : string;
    name : String;
    author : String;
    nbPlates : number;
    //priceCoef : number;
    //category : RecipeType;
    //progression : Progression;

    constructor(id: string, name : String,
        author : String,
        nbPlates : number
        //priceCoef : number,
        //category : RecipeType,
        //progression : Progression
        ) {
            this.id = id;
            this.name = name;
            this.author = author;
            this.nbPlates = nbPlates;
            //this.priceCoef = priceCoef;
            //this.category = category;
            //this.progression = progression;
        }

}
