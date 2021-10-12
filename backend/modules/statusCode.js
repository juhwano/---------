module.exports = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401, //토큰이 없음
  FORBIDDEN: 403, //토큰 인증은 되었지만 권한은 없음
  NOT_FOUND: 404, //요청한 URI를 찾을 수 없음
  CONFLICT: 409, //클라이언트의 요청이 서버의 상태와 충돌이 발생
  INTERNAL_SERVER_ERROR: 500, // 서버의 문제로 응답할 수 없음
  SERVICE_UNAVAILABLE: 503, //현재 서버가 일시적으로 사용이 불가함
  DB_ERROR: 600,
};
