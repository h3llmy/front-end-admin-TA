import { useState } from "react";
import ProgressBar from "../components/loading/progressBar";

export default function Test() {
  const [uploadProgress, setUploadProgress] = useState(0);
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 101);
    setUploadProgress(randomNumber);
  });
  return <ProgressBar progress={uploadProgress} />;
}
