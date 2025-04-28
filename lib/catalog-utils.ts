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

// Парсит товары (разбивает имя, но сохраняет остальные поля)
export function parseProducts(products: RawProduct[]): (RawProduct & ProductVariation & { cleanName: string })[] {
  return products.map((product) => {
    const originalName = product.name || "";

    const [namePart, ...restParts] = originalName.split(",");

    const sizeMatch = originalName.match(/\b(\d{1,2}?XL|XXL|XL|XS|S|M|L|XXXL)\b/i);
    const size = sizeMatch ? sizeMatch[0] : "";

    let color = restParts.join(",").replace(size, "").trim();
    let cleanName = namePart.replace(size, "").trim();

    return {
      ...product,
      cleanName,
      color,
      size
    };
  });
}

// Группировка товаров
export function groupProducts(products: (RawProduct & ProductVariation & { cleanName: string })[]): CatalogProduct[] {
  const grouped: Record<string, { baseProduct: RawProduct; variations: ProductVariation[] }> = {};

  products.forEach((product) => {
    const { cleanName, color, size, ...baseProduct } = product;

    if (!grouped[cleanName]) {
      grouped[cleanName] = {
        baseProduct,
        variations: []
      };
    }

    grouped[cleanName].variations.push({ color, size });
  });

  // Преобразуем в массив
  return Object.keys(grouped).map((name) => {
    const { baseProduct, variations } = grouped[name];

    return {
      ...baseProduct,
      name,
      variations
    };
  });
}

// Полная функция подготовки каталога
export function prepareCatalog(products: RawProduct[]): CatalogProduct[] {
  const parsed = parseProducts(products);
  const grouped = groupProducts(parsed);
  return grouped;
}
