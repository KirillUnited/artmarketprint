import { importDataToSanity } from "@/sanity/import";
import { getXmlData } from "./fetch-artegifts-data";
import {getAllProducts} from "@/lib/actions/product.actions";

export async function updateProducts() {
    // const jsonData = await getXmlData();
    // const AllProducts = await getAllProducts();
    const importedData = await importDataToSanity();
}