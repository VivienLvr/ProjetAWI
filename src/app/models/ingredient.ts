export enum IngredientType {
    meat = 'Viande',
    vegetable = "Légume",
    fruit = "Fruit",
    epicerie = "Epicerie"
}

export enum Unit {
    gramm = 'g',
    litre = 'l',
    piece = 'Pièce',
    kg = 'kg'
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
