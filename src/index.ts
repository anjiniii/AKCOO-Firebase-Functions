// Firebase Admin SDK to access Firestore
import { initializeApp } from "firebase-admin/app";
import { updateExchangeRateHandler } from "./handlers/updateExchangeRate";

// Firebase Admin SDK 초기화
initializeApp();

// Firestore에 데이터를 추가하는 HTTP 트리거 함수
export const updateExchangeRate = updateExchangeRateHandler;
