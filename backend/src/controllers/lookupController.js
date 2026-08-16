import LookupService from "../services/lookupService.js";

const lookupService = new LookupService();

class LookupController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns
   */
  async barcodeLookup(req, res) {
    try {
      const { upc } = req.params;
      console.log("upc in lookup controller");
      console.log(upc);

      // execute lookup through service
      const result = await lookupService.upcLookup(Number(upc));
      console.log("result");
      console.log(result);
      if (!result) {
        return res.status(400).send("No result returned from barcode lookup");
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
    // return response
  }
}

export default LookupController;
