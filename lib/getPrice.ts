export const getPrice = (price: any, rate: number) => (Number(price)*rate).toFixed(2);
/**
 * Transforms procent value to number
 * @param procent - procent value as string
 * @returns number value
 */
export const priceTransform = (procent: string | number) => Number(procent) / 100;