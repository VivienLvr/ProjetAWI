export enum IngredientType {
    meat = 'Viande',
    fish = 'Poissons et crustacés',
    cremerie = "Crèmerie",
    vegetable = "Légume",
    fruit = "Fruit",
    epicerie = "Epicerie"
}

export enum Unit {
    gramm = 'g',
    litre = 'l',
    piece = 'Pièce',
    kg = 'kg',
    botte = 'botte'
}

export class Ingredient {
    id : string;
    name : String;
    category : IngredientType;
    unit : Unit;
    stock : number;
    unitPrice : number;
    isAlergen : boolean;

    constructor(id: string, name: String, cate: IngredientType, unit: Unit, stock: number, unitPrice: number, isAlergen: boolean) {
        this.id = id;
        this.name = name;
        this.category = cate;
        this.unit = unit;
        this.stock = stock;
        this.unitPrice = unitPrice;
        this.isAlergen = isAlergen;
    }
}
