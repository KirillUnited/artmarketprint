"use server";

import { parseStringPromise } from "xml2js";
import { XMLParser } from "fast-xml-parser";
import { getJsonFileData } from "../utils";
import path from "path";

const PRODUCT_DESCRIPTION_URL = 'https://art24.by/capi_v100_xmls/products_description_xml_cdata001.xml';
const MINSKSTOCKS_URL = 'https://art24.by/capi_v100_xmls/minskstocks.xml';
const AUTH = Buffer.from("resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812").toString("base64");
// const DATA_FILE_PATH = '_data/products.json';

export async function getXmlData(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + btoa('resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812')
      },
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

    const xmlText = await response.text();
    const jsonData = await parseStringPromise(xmlText);

    return jsonData;
  } catch (error) {
    console.error("Ошибка при загрузке XML:", error);

    return null;
  }
}

export async function fetchXMLStream() {
  const response = await fetch(PRODUCT_DESCRIPTION_URL, {
    headers: { Authorization: `Basic ${AUTH}` },
  });

  if (!response.body) {
    throw new Error("Ошибка: тело ответа пустое.");
  }

  // Настраиваем потоковое чтение
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
    cdataPropName: "__cdata", // Сохраняем CDATA отдельно
    allowBooleanAttributes: true,
    processEntities: true, // Автоматически заменяет HTML-сущности (&lt; &gt;)
  });

  let xmlText = "";
  let limit = 5 * 1024 * 1024; // Увеличиваем лимит данных (10МБ)

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    xmlText += decoder.decode(value, { stream: true });

    // Проверяем, есть ли незакрытый CDATA
    if (xmlText.includes("<![CDATA[") && !xmlText.includes("]]>")) {
      console.warn("⚠️ Незакрытый CDATA, ждем оставшуюся часть...");
      continue; // Ждем загрузку остальной части XML
    }

    // Ограничиваем размер XML (если нужно)
    if (xmlText.length > limit) {
      console.log("⚠️ Достигнут лимит данных, останавливаем загрузку...");
      break;
    }
  }

  // Парсим XML в JSON
  const jsonData = parser.parse(xmlText);

  // await saveJsonToFile("_data/products.json", jsonData);

  return jsonData;
}

export async function getAllProducts() {
  const DATA_FILE_PATH = path.join(process.cwd(), '_data/products.json');
  const { data } = await getJsonFileData(DATA_FILE_PATH) ?? {};

  if (!data) {
    return [];
  }

  return data.item?.map((product: any) => product);
}

export async function getAllProductCategories(limit = 10) {
  const products = await getAllProducts();
  const getCategory = (category: string) => category.split('|').shift();
  const categories = new Set(products?.map((product: any) => getCategory(product.category)));

  return Array.from(categories).slice(0, limit);
}

export async function getProductsByLimit(limit: number) {
  const products = await getAllProducts();

  return products.slice(0, limit);
}

export async function getRelatedProductsByCategory(category: string, id: number, limit = 10) {
  const products = await getAllProducts();
  const relatedProducts = products.filter((product: any) => product.category === category && product.id['#text'] !== id);

  return Array.from(relatedProducts).slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();

  return products.find((product: any) => product.id['#text'] === Number(slug));
}

export async function searchProductsByName(searchParam: string) {
 const products = await getAllProducts();

 return products.filter((product: any) => product.product?.__cdata.toLowerCase().includes(searchParam.toLowerCase()));
}