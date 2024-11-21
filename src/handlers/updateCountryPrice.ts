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
    const { countryID, prices } = body;

    if (!countryID || !Array.isArray(prices) || prices.length === 0) {
      sendErrorResponse(
        res,
        400,
        "Body must contain 'countryID' and a non-empty 'prices' array."
      );
      return;
    }

    // prices 위치
    const pricesRef = getFirestore()
      .collection("countries")
      .doc(countryID as string)
      .collection("prices");

    // Batch 쓰기 시작
    const batch = getFirestore().batch();

    for (const priceDetail of prices) {
      // 쿼리로 해당 문서를 찾기
      const querySnapshot = await pricesRef
        .where("category", "==", priceDetail.category)
        .where("item", "==", priceDetail.item)
        .get();

      if (querySnapshot.empty) {
        // 문서가 없으면 새로 생성
        const docRef = pricesRef.doc();
        batch.set(docRef, priceDetail);
      } else {
        // 문서가 있으면 해당 문서 업데이트
        querySnapshot.forEach((doc) => {
          const docRef = pricesRef.doc(doc.id);
          batch.update(docRef, { price: priceDetail.price });
        });
      }
    }

    // Batch 커밋
    await batch.commit();

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
