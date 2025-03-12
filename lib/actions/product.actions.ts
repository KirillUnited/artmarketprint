'use server';

import path from "path";
import { getJsonFileData } from "@/lib/utils";
// import { ARTE_PRODUCTS_FILE_PATH } from "../fetch-artegifts-data";

export async function getAllProducts() {
  const DATA_FILE_PATH = path.join(process.cwd(), '_data/products-12-03-25.json');
  const { data } = await getJsonFileData(DATA_FILE_PATH) ?? {};

  if (!data) {
    return [];
  }

  return data.item?.map((product: any) => product);
}

export async function getAllProductCategories(limit = 10) {
  const products = await getAllProducts();
  const getCategory = (category: string) => category[0].split('|').shift();
  const categories = new Set(products?.map((product: any) => getCategory(product.category)));

  return Array.from(categories).slice(0, limit);
}

export async function getProductsByLimit(limit: number) {
  const products = await getAllProducts();

  return products.slice(0, limit);
}

export async function getRelatedProductsByCategory(category: string, id: number, limit = 10) {
  const products = await getAllProducts();
  const relatedProducts = products.filter((product: any) => product.category[0] === category && product.id[0]['_'] !== id);

  return Array.from(relatedProducts).slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();

  return products.find((product: any) => product.id[0]['_'] === slug);
}

export async function searchProductsByName(searchParam: string) {
 const products = await getAllProducts();

 return products.filter((product: any) => product.product[0]['_'].toLowerCase().includes(searchParam.toLowerCase()));
}