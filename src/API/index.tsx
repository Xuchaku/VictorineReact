import { POINT_API } from "../constants/constants";
import Register from "../types/Registrer/Register";
class API {
  private host: string;
  constructor(url: string) {
    this.host = url;
  }
  async post(point: string, data?: Register) {
    const response = await fetch(this.host + point, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data || {}),
    });

    const result = await response.json();
    return result;
  }
}
export const api = new API(POINT_API);
