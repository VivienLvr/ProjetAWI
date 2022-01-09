import { Stage, QuantityIngredient } from "./stage";

export class StageDescription extends Stage {
    description : String;

    constructor(id: string, title: String, duration: number, ingredients: Array<QuantityIngredient>, descr: String) {
        super(id, title, duration, ingredients);
        this.description = descr;
    }
}
