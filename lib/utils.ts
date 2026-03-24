
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