import { Stage, QuantityIngredient } from "./stage";

export class StageDescription extends Stage {
    description? : String;
    phase: number;

    constructor(id: string, title: String, phase: number, duration: number, ingredients?: Array<QuantityIngredient>, descr?: String) {
        super(id, title, duration, ingredients);
        this.phase = phase;
        this.description = descr;
    }
}
