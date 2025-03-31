import { client } from '@/sanity/client';

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const fs = require('fs').promises;

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const path = require('path');

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

    await fs.writeFile(filePath, jsonData, 'utf8');
    console.log(`✅ Файл успешно сохранен: ${filePath}`);
  } catch (error) {
    console.error('❌ Ошибка записи JSON-файла:', error);
  }
}

const DATA_FILE_NAME = 'products-27-03-25.json';
const DATA_FILE_PATH = path.join(process.cwd(), '_data', DATA_FILE_NAME);

// Кешируем данные, чтобы не загружать файл при каждом запросе
let cachedData: any | null = null;

export async function getJsonFileData(): Promise<any> {
  if (cachedData) return cachedData;

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    cachedData = JSON.parse(fileContent);
    return cachedData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw new Error(`Failed to load '${DATA_FILE_NAME}' file data`);
  }
}