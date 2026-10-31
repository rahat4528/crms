import { ProductType } from "@/models/Products";

export interface Product extends ProductType {
    _id: string;
}