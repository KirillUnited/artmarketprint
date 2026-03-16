export const getPrice = (price, rate) => (Number(price)*rate).toFixed(2);
/**
 * Transforms procent value to number
 * @param procent - procent value as string
 * @returns number value
 */
export const priceTransform = (procent) => Number(procent) / 100;