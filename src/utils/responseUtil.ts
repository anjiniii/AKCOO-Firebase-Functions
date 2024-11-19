import { Response } from "express";
import { ErrorResponseDTO, SuccessResponseDTO } from "../dto/responseDTO";

// 성공 응답
export const sendSuccessResponse = <T>(
  res: Response,
  code: number,
  date: string,
  message: string,
  data?: T
) => {
  const response: SuccessResponseDTO<T> = {
    status: "success",
    code,
    date,
    message,
    data,
  };
  res.status(code).json(response);
};

// 에러 응답
export const sendErrorResponse = (
  res: Response,
  code: number,
  message: string,
  details?: string
) => {
  const response: ErrorResponseDTO = {
    status: "error",
    code,
    message,
    details,
  };
  res.status(code).json(response);
};
