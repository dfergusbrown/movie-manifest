import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

function BardodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let active = true;

    reader
      .decodeFromConstraints(
        { video: { facingMode: "environment" } }, // rear camera
        videoRef.current,
        (result, err) => {
          if (result && active) {
            active = false;
            onScan(result.getText()); // the decoded UPC string
            reader.reset();
          }
          // err fires continuously while no barcode is in frame — not a real error, ignore it
        },
      )
      .catch((err) => setError(err.message));
  }, [onScan]);
  if (error) return <div>Camera error: {error}</div>;

  return <video ref={videoRef} className="w-full rounded-lg" />;
}

export default BarcodeScanner;
