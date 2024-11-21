export interface UpdateCountryPricesBodyDTO {
  countryID: string;
  prices: PriceDetailDTO[];
}

export interface PriceDetailDTO {
  category: string;
  item: string;
  price: number;
}
