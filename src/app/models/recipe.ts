import { Progression } from "./progression";

enum RecipeType {
    cake = "Gateau",
    sauce = "Sauce"
}

export class Recipe {
    id : String;
    name : String;
    author : String;
    covers : number;
    priceCoef : number;
    category : RecipeType;
    progression : Progression;

    constructor(id: String, name : String,
        author : String,
        covers : number,
        priceCoef : number,
        category : RecipeType,
        progression : Progression) {
            this.id = id;
            this.name = name;
            this.author = author;
            this.covers = covers;
            this.priceCoef = priceCoef;
            this.category = category;
            this.progression = progression;
        }

}
