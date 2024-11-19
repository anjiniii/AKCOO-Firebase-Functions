// Firebase Admin SDK to access Firestore
import { initializeApp } from "firebase-admin/app";
import { updateExchangeRateHandler } from "./handlers/updateExchangeRate";
import { updateCountryPriceHandler } from "./handlers/updateCountryPrice";

// Firebase Admin SDK 초기화
initializeApp();

// Firestore에 환율 정보 업데이트
export const updateExchangeRate = updateExchangeRateHandler;

// Firestore에 물가 정보 업데이트
export const updateCountryPrice = updateCountryPriceHandler;
