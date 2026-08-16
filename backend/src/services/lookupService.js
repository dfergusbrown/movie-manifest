import dotenv from "dotenv";
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
      const result = await fetch(`${this.BASE_URL}?upc=${upc}`, {
        method: "GET",
        headers: this.headers,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default LookupService;
