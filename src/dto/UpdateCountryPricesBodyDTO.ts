// 숙박, 식당, 카페 각각의 세부 항목 정의
export interface AccommodationDTO {
  guesthouse: number;
  "3Star": number;
  "4Star": number;
}

export interface RestaurantDTO {
  local: number;
  casualDining?: number;
}

export interface CafeDTO {
  local: number;
  starbucks: number;
}

// prices 전체 구조 정의
export interface PricesDTO {
  accommodation: AccommodationDTO;
  restaurant: RestaurantDTO;
  cafe: CafeDTO;
}

export interface UpdateCountryPricesBodyDTO {
  countryId: string;
  prices: PricesDTO;
}
