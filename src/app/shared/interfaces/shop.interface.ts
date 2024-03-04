import { Product } from "./product.interface";

export interface Shop {
    id:number;
    name: string;
    description: string;
    addressLane1: string;
    addressLane2: string;
    city: string;
    rating: number;
    type: "product" | "service";
    avgPricing: string;
    category: string;
    subcategory: string;
    products:Product[]
}