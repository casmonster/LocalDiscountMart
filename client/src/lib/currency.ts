/**
 * Format a price in Rwandan Francs (RWF)
 * 
 * @param price - Price to format
 * @param options - Formatting options
 * @returns Formatted price string
 */
export function formatRwandanFrancs(
  price: number | null | undefined, 
  options: { 
    showCurrency?: boolean,
    showDecimals?: boolean 
  } = {}
): string {
  const { showCurrency = true, showDecimals = false } = options;
  
  if (price === null || price === undefined) {
    return 'N/A';
  }
  
  // Rwanda uses commas as thousands separators and periods as decimal separators
  const formatter = new Intl.NumberFormat('fr-RW', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'RWF',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  
  return formatter.format(price);
}

/**
 * Convert a price from USD to Rwandan Francs (RWF)
 * Using an approximate exchange rate of 1 USD = 1,200 RWF
 * 
 * @param usdPrice - Price in USD
 * @returns Price in RWF
 */
export function convertToRwandanFrancs(usdPrice: number | null | undefined): number | null {
  if (usdPrice === null || usdPrice === undefined) {
    return null;
  }
  
  // Approximate exchange rate: 1 USD = 1,200 RWF
  const exchangeRate = 1200;
  return Math.round(usdPrice * exchangeRate);
}