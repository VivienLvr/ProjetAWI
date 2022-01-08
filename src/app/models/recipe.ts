import { Progression } from "./progression";

export enum RecipeType {
    cake = "Gateau",
    sauce = "Sauce"
}

export class Recipe {
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
