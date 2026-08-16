import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lookupByUPC } from "../apiHelper";

const ConfirmTitle = () => {
  const { upc } = useParams();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    console.log("confirm result upc:", upc);
    const upcLookup = async () => {
      try {
        const result = await lookupByUPC(upc);
        console.log("confirm result-- Actual result");
        console.log(result);
      } catch (error) {
        console.log("*** useEffect Error ***");
        console.error(error);
      }
    };
    upcLookup();
  }, []);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <h1>RESULT FOUND</h1>
        <img src="" alt="" />
      </section>
    </div>
  );
};

export default ConfirmTitle;
