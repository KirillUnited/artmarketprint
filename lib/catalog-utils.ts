// Типы товара
export interface RawProduct {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  category: string;
  description: string;
  image: string;
  images_urls: string;
  name: string;
  price: number;
}

export interface ProductVariation {
  color: string;
  size: string;
}

export interface CatalogProduct extends Omit<RawProduct, 'name'> {
  name: string; // Очищенное название без цвета и размера
  variations: ProductVariation[];
}

/**
 * Группировка товаров по "чистому" названию без цвета и размера
 * @param {Array} products - исходный массив товаров
 * @returns {Array} - сгруппированный массив товаров
 */
export function groupProductsByCleanName(products: any[]) {
  const grouped: Record<string, any> = {};

  products.forEach(product => {
    // Получаем исходное название
    const rawName = product.product?.[0]?._?.trim() || 'Без названия';

    // Удаляем цвет и размер после последней запятой (например: "Ланъярд из полиэстера HOST, Черный XL." -> "Ланъярд из полиэстера HOST")
    const cleanName = rawName.split(',')[0].trim();

    const color = product.vcolor?.[0]?.trim();
    const size = product.size_range?.[0]?.trim();

    // Create unique key for product variation
    const variationKey = `${color || ''}:${size || ''}`;

    if (!grouped[cleanName]) {
      grouped[cleanName] = {
        _id: product?.id[0]?._ || '',
        id: product.id[0]._,
        name: cleanName,
        colors: new Set(),
        sizes: new Set(),
        items: new Map<string, { id: string, images_urls: string }>(), // Map to store only id and images_urls
        price: product.price?.[0],
        url: product.url?.[0],
        image: product.images_urls[0]?.split(',')[0],
        images_urls: product.images_urls?.[0],
        description: product.general_description?.[0],
        variation_description: product.variation_description?.[0],
        category: product.category[0].split('|')[0],
      };
    }

    if (color) grouped[cleanName].colors.add(color);
    if (size) grouped[cleanName].sizes.add(size);

    // Only store unique variations
    if (!grouped[cleanName].items.has(variationKey)) {
      const { id, images_urls, vcolor } = product;
      const vars = {
        id: id[0]._,
        cover: images_urls[0].split(',')[0],
        images_urls,
        color: vcolor[0],
      };

      grouped[cleanName].items.set(variationKey, vars);
    }
  });

  // Transform the grouped data
  return Object.values(grouped).map(entry => ({
    ...entry,
    colors: Array.from(entry.colors),
    sizes: Array.from(entry.sizes),
    items: Array.from(entry.items.values()), // Convert Map values to array
  }));
}
