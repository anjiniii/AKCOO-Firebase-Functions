import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/https";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtil";
import { UpdateExchangeRateBodyDTO } from "../dto/UpdateExchangeRateBodyDTO";

// Firestore에 데이터를 추가하는 HTTP 트리거 함수
export const updateExchangeRateHandler = onRequest(async (req, res) => {
  try {
    // 요청 메서드 검증
    if (req.method !== "POST") {
      sendErrorResponse(res, 405, "Only POST requests are allowed.");
      return;
    }

    // 요청 본문 검증
    const body: UpdateExchangeRateBodyDTO = req.body;
    const { countryId, exchangeRate } = body;

    // body가 없는 경우 오류 반환
    if (!countryId || !exchangeRate) {
      sendErrorResponse(
        res,
        400,
        "Both body contents - 'countryId' and 'exchangeRate' - are required."
      );
      return;
    }

    // Firebase Admin SDK를 사용하여 Firestore에 데이터 추가
    const updateResult = await getFirestore()
      .collection("countries")
      .doc(countryId as string)
      .update({
        exchangeRate: exchangeRate,
      });

    // 성공 메시지 반환
    sendSuccessResponse(
      res,
      200,
      `${updateResult.writeTime.toDate().toISOString()}`,
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
