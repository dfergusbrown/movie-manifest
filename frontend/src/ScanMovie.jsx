import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
const BarcodeScanner = () => {
  const videoRef = useRef();
  const [error, setError] = useState(null);
  useEffect(() => {
    async function listDevices() {
      const reader = new BrowserMultiFormatReader();
      // const scanResult = reader.scanOneResult();
      // const scanResult = reader.scan();
    }
    let stream;
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError(err.message);
      }
    }
    startCamera();
    // Cleanup
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
    // listDevices();
  }, []);

  if (error) return <div>Camera error: {error}</div>;

  return (
    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
  );
};

export default BarcodeScanner;
