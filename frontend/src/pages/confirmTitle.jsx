import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lookupByUPC } from "../apiHelper";

const ConfirmTitle = () => {
  const { upc } = useParams();
  const [resultData, setResultData] = useState(null);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    console.log("confirm result upc:", upc);
    const upcLookup = async () => {
      try {
        const product = await lookupByUPC(upc);
        if (product) setPosters(product.allImages);
      } catch (error) {
        console.log("*** useEffect Error ***");
        console.error(error);
      }
    };
    upcLookup();
  }, []);

  if (!posters || posters.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <h1>RESULT FOUND</h1>
        {posters.map((url) => (
          <div>
            <p>image placeholder</p>
            <image src={url} height={"100px"} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ConfirmTitle;
