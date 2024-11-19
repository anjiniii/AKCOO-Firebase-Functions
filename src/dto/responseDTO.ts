// 성공 응답
export interface SuccessResponseDTO<T> {
  status: string;
  code: number;
  date: string;
  message: string;
  data?: T;
}

// 에러 응답
export interface ErrorResponseDTO {
  status: string; // 항상 "error"
  code: number; // HTTP 상태 코드 (예: 400, 404, 500 등)
  message: string; // 에러 메시지
  details?: string; // 상세 에러 정보 (옵션)
}
