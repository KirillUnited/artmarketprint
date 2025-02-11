"use server";

import { parseStringPromise } from "xml2js";
import { XMLParser } from "fast-xml-parser";

const PRODUCT_DESCRIPTION_URL = 'https://art24.by/capi_v100_xmls/products_description_xml_cdata001.xml';
const MINSKSTOCKS_URL = 'https://art24.by/capi_v100_xmls/minskstocks.xml';
const AUTH = Buffer.from("resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812").toString("base64");

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

export async function fetchXML() {
  const response = await fetch(PRODUCT_DESCRIPTION_URL, {
    headers: {
      Authorization: `Basic ${AUTH}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки XML: ${response.status} ${response.statusText}`);
  }

  // Создаем потоковый ридер для обработки данных на лету
  const reader = response.body?.getReader();
  let decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { value, done } = await reader!.read();
    if (done) break;

    result += decoder.decode(value, { stream: true });

    // Ограничим размер загружаемых данных (например, только первые 50КБ)
    if (result.length > 50 * 1024) {
      console.log("Превышен лимит данных, останавливаем загрузку...");
      break;
    }
  }

  return result;
}

export async function fetchXMLStream() {
  const url = "https://art24.by/capi_v100_xmls/products_description_xml_cdata001.xml";
  const auth = Buffer.from("resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812").toString("base64");

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
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
  let limit = 500 * 1024; // Увеличиваем лимит данных (500 КБ)

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
  return jsonData;
}


