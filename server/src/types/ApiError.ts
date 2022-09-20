class ApiError extends Error {
  public status: number;
  constructor(status: number, text: string) {
    super(text);
    this.status = status;
  }
  static UnauthorizedError() {
    return new ApiError(400, "Вы не авторизированы!");
  }
  static TokenExpired() {
    return new ApiError(400, "Токен просрочен или не валиден!");
  }
}
export default ApiError;
