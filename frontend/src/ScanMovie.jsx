import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import {
  BarcodeFormat,
  DecodeHintType,
  NotFoundException,
} from "@zxing/library";

const overRideConsoleWarnings = () => {
  const originalWarn = console.warn;
  const originalError = console.error;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("non-ReaderException"))
      return;
  };
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("nonReaderException"))
      return;
    originalError(...args);
  };
};

const setHints = () => {
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.UPC_A,
    BarcodeFormat.EAN_13,
  ]);
  return hints;
};

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [barcodeResult, setBarcodeResult] = useState(null);

  useEffect(() => {
    overRideConsoleWarnings();
    const hints = setHints();
    const reader = new BrowserMultiFormatReader(hints);
    let controls;
    async function startScanning() {
      try {
        controls = await reader.decodeFromConstraints(
          {
            video: { facingMode: "environment" },
          },
          videoRef.current,
          (result, err) => {
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
            }
            if (result) {
              const scanResult = result.getText();

              if (scanResult.test(/^\d{12}$/)) {
                onScan(result.getText());
                setBarcodeResult(scanResult);
                controls?.stop();
              } else {
                setError(`Barcode Invalid: ${scanResult}`);
                controls?.stop();
              }
            }
          },
        );
      } catch (e) {
        setError(e.message);
      }
    }
    startScanning();

    return () => {
      //   stream?.getTracks().forEach((track) => track.stop());
      controls?.stop();
      console.log("FINAL RESULT", barcodeResult);
    };
    // listDevices();
  }, [onScan]);

  if (error) return <div>Camera error: {error}</div>;

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full rounded-lg"
      style={{ height: "100vh" }}
    />
  );
};

export default BarcodeScanner;
