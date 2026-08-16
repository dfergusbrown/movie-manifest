import LookupService from "../services/lookupService.js";

const lookupService = new LookupService();

class LookupController {
  async barcodeLookup(req, res) {
    try {
      const { upc } = req.params;
      console.log("upc in lookup controller");
      console.log(upc);

      // execute lookup through service
      const result = await lookupService.upcLookup(upc);
      console.log("result");
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
    // return response
  }
}

export default LookupController;
