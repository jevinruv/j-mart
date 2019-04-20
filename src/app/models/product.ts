import { Category } from "./category";

export class Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    supplier: Category = new Category();

    constructor() {
        this.id = null;
        this.name = null;
        this.price = null;
        this.imageUrl = null;
        this.description = null;
    }
}