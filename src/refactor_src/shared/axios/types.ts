import { AxiosError } from "axios";

// custom error message from Flask Backend
// 백엔드에서 에러 코드를 보낼 때 아래와 같이 JSON형태로 보내줌
interface CustomServerError {
  error: string;
}

export type CustomAxiosError = AxiosError<CustomServerError>;
