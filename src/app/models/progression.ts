import { QuantityIngredient, Stage } from "./stage";

export class Progression extends Stage {
    duration?: number; // Stage duration in minutes
    stages?: Array<Stage>;

    /*constructor(id: number, title: String, ingredients: Array<QuantityIngredient>, duration: number, stages: Array<Stage>) {
        super(id, title, ingredients);
        this.duration = duration;
        this.stages = stages;
    }*/

    constructor() {
        super(0, "", []);
    }
}
