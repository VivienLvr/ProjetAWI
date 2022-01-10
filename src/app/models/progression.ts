import { QuantityIngredient, Stage } from "./stage";
import { StageDescription } from "./stage-description";

export class Progression extends Stage {
    stages: Array<StageDescription>;

    constructor(id: string, title: String, ingredients: Array<QuantityIngredient>, duration: number, stages: Array<StageDescription>) {
        super(id, title, duration, ingredients);
        this.duration = duration;
        this.stages = stages;
    }
    /*
    constructor() {
        super("", "", 0, []);
    }*/
}
