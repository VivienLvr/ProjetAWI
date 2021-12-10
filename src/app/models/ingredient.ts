import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

enum IngredientType {
    meat = 'Meat',
    vegetable = "Vegetable",
    fruit = "Fruit"
}

enum Unit {
    gramm = 'g',
    litre = 'l',
    piece = 'Pièce'
}

export class Ingredient {
    id : number;
    name : String;
    category : IngredientType;
    unit : Unit;
    stock : number;
    unitPrice : number;
    isAlergen : boolean;

    constructor(id: number, name: String, cate: IngredientType, unit: Unit, stock: number, unitPrice: number, isAlergen: boolean) {
        this.id = id;
        this.name = name;
        this.category = cate;
        this.unit = unit;
        this.stock = stock;
        this.unitPrice = unitPrice;
        this.isAlergen = isAlergen;
    }
}
