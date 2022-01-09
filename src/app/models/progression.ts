import { QuantityIngredient, Stage } from "./stage";

export class Progression extends Stage {
    stages?: Array<Stage>;

    constructor(id: string, title: String, ingredients: Array<QuantityIngredient>, duration: number, stages: Array<Stage>) {
        super(id, title, duration, ingredients);
        this.duration = duration;
        this.stages = stages;
    }
    /*
    constructor() {
        super("", "", 0, []);
    }*/
}
