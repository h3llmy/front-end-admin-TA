import { useState, useEffect } from "react";
import ProgressBar from "../loading/progressBar";
import axios from "axios";
import JSZip from "jszip";

const InputMultipleFiles = ({
  disable,
  name,
  inputValue,
  defaultValue,
  process,
  downloadAble,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setLoadingProgress(process);
  }, [process]);

  const fetchFile = async () => {
    try {
      if (defaultValue && Array.isArray(defaultValue)) {
        const files = await Promise.all(
          defaultValue.map(async (value) => {
            const fileName = value.split(/[/|-]+/).pop();
            const response = await axios.get(value, {
              responseType: "blob",
              onDownloadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setLoadingProgress(percentCompleted);
              },
            });
            return new File([response.data], fileName, {
              type: response.data.type,
            });
          })
        );
        setSelectedFiles([...files]);
        setCurrentSlide(selectedFiles.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [defaultValue]);

  useEffect(() => {
    inputValue(selectedFiles);
  }, [selectedFiles]);

  const handleFileSelect = (event) => {
    event.preventDefault();
    if (!disable) {
      const files = Array.from(event.target.files);
      setCurrentSlide(selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    if (!disable) {
      const files = Array.from(event.dataTransfer.files);
      setCurrentSlide(selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleDownloadSelectedFile = (event) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(selectedFiles[currentSlide]);
    link.download = selectedFiles[currentSlide].name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllFile = async (event) => {
    event.preventDefault();
    const zip = new JSZip();
    selectedFiles.forEach((file) => {
      zip.file(file.name, file);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${name.replace(" ", "-")}-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + selectedFiles.length) % selectedFiles.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % selectedFiles.length);
  };

  return (
    <>
      <label
        htmlFor="dropzone-file"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <div
        className="relative w-full"
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {selectedFiles.length > 1 && (
          <>
            <button
              type="button"
              className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              onClick={(event) => {
                event.preventDefault();
                handlePrevSlide(event);
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-[#262626] hover:dark:bg-[#737373] opacity-40">
                &#10094;
              </div>
            </button>
            <button
              type="button"
              className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              onClick={(event) => {
                event.preventDefault();
                handleNextSlide(event);
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-[#262626] hover:dark:bg-[#737373] opacity-40">
                &#10095;
              </div>
            </button>
          </>
        )}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="
              flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
              bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600
            "
          >
            {selectedFiles.length === 0 ? (
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
            ) : (
              selectedFiles.length > 0 &&
              selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`h-64 flex items-center justify-center ${
                    index === currentSlide ? "active" : "hidden"
                  }`}
                >
                  {file.type.includes("image/") ? (
                    <img
                      className="flex flex-center h-full"
                      src={file.url || URL.createObjectURL(file)}
                    />
                  ) : file.type.includes("audio/") ? (
                    <audio controls controlsList="nodownload">
                      <source
                        src={file.url || URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </audio>
                  ) : file.type.includes("video/") ? (
                    <video controls controlsList="nodownload">
                      <source
                        src={file.url || URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                      </svg>
                      <div className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">File Name:</span>
                        <p>{file.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              disabled={disable}
              onChange={handleFileSelect}
            />
          </label>
        </div>
        {<ProgressBar progress={loadingProgress} />}
        <div className="flex items-center justify-center w-full">
          {selectedFiles.length > 0 && !disable && (
            <button
              onClick={(event) => {
                event.preventDefault();
                handleFileRemove(currentSlide);
              }}
            >
              Remove
            </button>
          )}
          {selectedFiles.length > 0 && disable && downloadAble && (
            <div className="flex space-x-5">
              <button onClick={handleDownloadSelectedFile}>
                {selectedFiles.length > 1 ? "Download Single File" : "Download"}
              </button>
              {selectedFiles.length > 1 && (
                <button onClick={handleDownloadAllFile}>
                  Download All File
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputMultipleFiles;
