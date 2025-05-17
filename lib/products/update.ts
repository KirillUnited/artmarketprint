import { importDataToSanity } from "@/sanity/import";
import { getXmlData } from "./fetch-artegifts-data";

export async function updateProducts() {
    const jsonData = await getXmlData();
    const importedData = await importDataToSanity();
}