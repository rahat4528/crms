import { PageSectionType } from "@/models/PageSections";
import { Product } from "./product";

export interface PageSection extends Omit<PageSectionType, 'products'> {
  products: Product[];
  _id: string;
}