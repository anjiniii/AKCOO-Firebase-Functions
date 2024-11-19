import { onRequest } from "firebase-functions/https";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtil";
import { getFirestore } from "firebase-admin/firestore";
import { UpdateCountryPricesBodyDTO } from "../dto/UpdateCountryPricesBodyDTO";

// Firestore에 데이터를 추가하는 HTTP 트리거 함수
export const updateCountryPriceHandler = onRequest(async (req, res) => {
  try {
    // 요청 메서드 검증
    if (req.method !== "POST") {
      sendErrorResponse(res, 405, "Only POST requests are allowed.");
      return;
    }

    // 요청 본문 검증
    const body: UpdateCountryPricesBodyDTO = req.body;
    const { countryId, prices } = body;

    // "text" 파라미터가 없는 경우 오류 반환
    if (!countryId || !prices) {
      sendErrorResponse(
        res,
        400,
        "Both body contents - 'countryId' and 'prices' - are required."
      );
      return;
    }

    // prices 위치
    const pricesRef = getFirestore()
      .collection("countries")
      .doc(countryId as string)
      .collection("prices");

    // Firebase Admin SDK를 사용하여 Firestore에 데이터 추가
    // 각 카테고리와 세부 항목 업데이트
    for (const [category, priceData] of Object.entries(prices)) {
      for (const [field, value] of Object.entries(priceData as object)) {
        await pricesRef.doc(category).update({
          [field]: value,
        });
      }
    }

    // 성공 메시지 반환
    sendSuccessResponse(
      res,
      200,
      `${new Date().toISOString()}`,
      "성공적으로 요청을 완료했습니다.",
      body
    );
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Firestore에 환율 정보를 업데이트하지 못했습니다."
    );
  }
});
