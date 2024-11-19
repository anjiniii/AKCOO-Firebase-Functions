import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/https";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtil";

interface CountryParameterDTO {
  id: string;
  exchangeRate: number;
}

// Firestore에 데이터를 추가하는 HTTP 트리거 함수
export const updateExchangeRateHandler = onRequest(async (req, res) => {
  try {
    // 쿼리 파라미터에서 "text" 값을 가져옵니다.
    const { docID, exchangeRate } = req.query;

    // "text" 파라미터가 없는 경우 오류 반환
    if (!docID || !exchangeRate) {
      sendErrorResponse(
        res,
        400,
        "Both 'docID' and 'exchangeRate' query parameters are required."
      );
      return;
    }

    // Firebase Admin SDK를 사용하여 Firestore에 데이터 추가
    const updateResult = await getFirestore()
      .collection("countries")
      .doc(docID as string)
      .update({
        exchangeRate: parseFloat(exchangeRate as string),
      });

    const exchangeRateValue = parseFloat(exchangeRate as string);

    const data: CountryParameterDTO = {
      id: docID as string,
      exchangeRate: exchangeRateValue,
    };

    // 성공 메시지 반환
    sendSuccessResponse(
      res,
      200,
      `${updateResult.writeTime.toDate().toISOString()}`,
      "성공적으로 요청을 완료했습니다.",
      data
    );
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Firestore에 환율 정보를 업데이트하지 못했습니다."
    );
  }
});
