import { Ingredient } from "./ingredient";

export class QuantityIngredient {
    ingredient : Ingredient;
    quantity : number;

    constructor(i: Ingredient, qty: number) {
        this.ingredient = i;
        this.quantity = qty;
    }
}

export class Stage {
    id : number;
    title : String;
    ingredients : Array<QuantityIngredient>;

    constructor(id: number, title: String, ingredients: Array<QuantityIngredient>) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
    }

    public addIngredient(i: Ingredient, q: number): void {
        let qty = new QuantityIngredient(i, q);
        this.ingredients.push(qty);
    }
}
