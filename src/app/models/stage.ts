import { Ingredient } from "./ingredient";

export class QuantityIngredient {
    ingredient? : Ingredient;
    quantity? : number;

    constructor(i?: Ingredient, qty?: number) {
        this.ingredient = i;
        this.quantity = qty;
    }
}

export class Stage {
    id : string;
    title : String;
    
    duration: number; // Stage duration in minutes
    ingredients? : Array<QuantityIngredient>;

    constructor(id: string, title: String, duration: number, ingredients?: Array<QuantityIngredient>) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.ingredients = ingredients;
    }

    public addIngredient(i: Ingredient, q: number): void {
        let qty = new QuantityIngredient(i, q);
        this.ingredients?.push(qty);
    }
}
