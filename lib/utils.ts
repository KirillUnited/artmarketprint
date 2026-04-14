
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { client } from '@/sanity/client';

// const path = require('path');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUrlFor = (source: SanityImageSource) => {
  const builder = createImageUrlBuilder(client);

  return builder.image(source).format('webp').fit('crop').url();
}

// Function to check if a color name is valid (not a placeholder)
export function isValidColorName(colorName: string): boolean {
  // Check if it's a placeholder name like "Color_*"
  return !/^color_\w+/.test(colorName);
}

// Function to remove technical specifications from color names
export function removeTechnicalSpecs(colorName: string): string {
  // Remove technical specs like "32gb", "64gb", etc.
  return colorName.replace(/\b\d+(gb|mb|kb|tb|px|mm|cm|inch|inches)\b/gi, '').trim();
}

// Function to process color names according to requirements
export function processColorNames(colors: string[]): string[] {
  const processedColors = colors.map(color => {
    // If it's not a valid color name, group it as "Другой"
    if (!isValidColorName(color)) {
      return 'Другой';
    }

    // Remove technical specifications
    return removeTechnicalSpecs(color);
  });

  // Remove duplicates and return
  const uniqueColors = Array.from(new Set(processedColors));
  return uniqueColors.filter(color => color !== '');
}