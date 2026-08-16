import dotenv from "dotenv";
import { mapUpcItemDbResponse } from "./mapBarcodeResponse.js";
dotenv.config();

class LookupService {
  constructor() {
    this.BASE_URL = process.env.UPCITEMDB_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  /**
   *
   * @param {number} upc
   * @returns
   */
  async upcLookup(upc) {
    try {
      console.log({
        baseURL: this.BASE_URL,
      });
      const response = await fetch(`${this.BASE_URL}?upc=${upc}`, {
        method: "GET",
        headers: this.headers,
      });
      if (!response.ok)
        throw new Error(`upcitemdb request failed: ${response.status}`);
      const raw = await response.json();
      return mapUpcItemDbResponse(raw);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default LookupService;
