import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
const fs = require("fs").promises;
const path = require("path");
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUrlFor = (source: SanityImageSource) => {
  const builder = imageUrlBuilder(client);

  return builder.image(source).url();
}

export async function saveJsonToFile(filename: string, data: any) {
  try {
    const filePath = path.resolve(process.cwd(), filename);
    const jsonData = JSON.stringify(data, null, 2); // Форматирование с отступами
    await fs.writeFile(filePath, jsonData, "utf8");
    console.log(`✅ Файл успешно сохранен: ${filePath}`);
  } catch (error) {
    console.error("❌ Ошибка записи JSON-файла:", error);
  }
}

export async function getJsonFileData(filename: string): Promise<any> {
  try {
    const fileContent = await fs.readFile(filename, 'utf-8');

    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw new Error(`Failed to load '${filename}' file data`);
  }
}