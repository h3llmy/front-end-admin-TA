import { useState, useEffect } from "react";
import ProgressBar from "../loading/progressBar";
import axios from "axios";

const InputSingleFile = ({
  disable,
  name,
  inputValue,
  defaultValue,
  process,
  downloadAble,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setLoadingProgress(process);
  }, [process]);

  const fetchFile = async () => {
    try {
      if (defaultValue) {
        const fileName = defaultValue.split(/[/|-]+/).pop();
        const response = await axios.get(defaultValue, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setLoadingProgress(percentCompleted);
          },
        });
        const file = new File([response.data], fileName, {
          type: response.data.type,
        });
        setSelectedFile(file);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [defaultValue]);

  useEffect(() => {
    inputValue(selectedFile);
  }, [selectedFile]);

  const handleFileSelect = (event) => {
    event.preventDefault();
    if (!disable) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!disable) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDownloadSelectedFile = (event) => {
    event.preventDefault();
    if (selectedFile) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(selectedFile);
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <label
        htmlFor="single-file-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <div className="relative w-full">
        <div
          className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
              bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFile ? (
            <div className="h-64 flex items-center justify-center">
              {selectedFile.type.includes("image/") ? (
                <img
                  className="flex flex-center h-full"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                />
              ) : selectedFile.type.includes("audio/") ? (
                <audio controls controlsList="nodownload">
                  <source
                    src={URL.createObjectURL(selectedFile)}
                    type={selectedFile.type}
                  />
                </audio>
              ) : selectedFile.type.includes("video/") ? (
                <video controls controlsList="nodownload">
                  <source
                    src={URL.createObjectURL(selectedFile)}
                    type={selectedFile.type}
                  />
                </video>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                  </svg>
                  <div className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">File Name:</span>
                    <p>{selectedFile.name}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <div className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
                <p>or drag and drop</p>
              </div>
            </div>
          )}
          <input
            id="single-file-input"
            type="file"
            className="hidden"
            disabled={disable}
            onChange={handleFileSelect}
          />
        </div>
        {<ProgressBar progress={loadingProgress} />}
        <div className="flex items-center justify-center w-full">
          {selectedFile && downloadAble && (
            <button onClick={handleDownloadSelectedFile}>Download</button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputSingleFile;
