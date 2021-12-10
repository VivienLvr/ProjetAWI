import { Stage, QuantityIngredient } from "./stage";

export class StageDescription extends Stage {
    description : String;

    constructor(id: number, title: String, ingredients: Array<QuantityIngredient>, descr: String) {
        super(id, title, ingredients);
        this.description = descr;
    }
}
