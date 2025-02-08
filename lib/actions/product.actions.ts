"use server";

import { parseStringPromise } from "xml2js";

export async function getXmlData(url: string) {
  try {
    const response = await fetch(url, { cache: "no-store" }); // Отключаем кэш
    if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

    const xmlText = await response.text(); // Получаем XML как строку
    const jsonData = await parseStringPromise(xmlText); // Конвертируем XML → JSON

    return jsonData; // Возвращаем JSON
  } catch (error) {
    console.error("Ошибка при загрузке XML:", error);
    return null;
  }
}

