let prices: number[] = [];

for (let i = 0; i < 100; i++) {
  let price: number = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  prices.push(price);
}

// Function to round number to the nearest 100
function roundToNearestHundred(n: number): number {
  return Math.round(n / 100) * 100;
}


// Interface for the price range object
interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

// Function to create price ranges
function createPriceRanges(prices: number[]): PriceRange[] {
  prices.sort((a, b) => a - b); // Sort prices in ascending order

  let min_price: number = roundToNearestHundred(prices[0]);
  let maxPrice: number = roundToNearestHundred(prices[prices.length - 1]);

  let priceStep: number = roundToNearestHundred((maxPrice - min_price) / 5);

  let ranges: PriceRange[] = [];

  for (let i = 0; i < 5; i++) {
    ranges.push({
      minPrice: min_price + i * priceStep,
      maxPrice: min_price + (i + 1) * priceStep,
    });
  }

  return ranges;
}

let PriceRanges: PriceRange[] = createPriceRanges(prices);


export const priceRanges = PriceRanges;


