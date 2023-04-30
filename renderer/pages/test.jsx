import { useState, useEffect } from "react";

export default function Test({ disable }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchFile = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/image/1682770186550-1682386288399.jpeg"
      );
      const blob = await response.blob();
      const file = new File([blob], "filename.jpg", { type: blob.type });
      setCurrentSlide(selectedFiles.length);
      setSelectedFiles([...selectedFiles, file]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  const handleFileSelect = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    setCurrentSlide(selectedFiles.length);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    if (!disable) {
      const files = Array.from(event.dataTransfer.files);
      setCurrentSlide(selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...files]);
    }
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
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {selectedFiles.length === 0 ? (
              <>
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
              </>
            ) : (
              <>
                {selectedFiles.length > 0 &&
                  selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className={`h-64 ${
                        index === currentSlide ? "active" : "hidden"
                      }`}
                    >
                      {file.type.includes("image/") ? (
                        <img
                          className="flex flex-center h-full"
                          src={file.url || URL.createObjectURL(file)}
                        />
                      ) : file.type.includes("audio/") ? (
                        <audio
                          className="w-full"
                          controls
                          src={file.url || URL.createObjectURL(file)}
                        />
                      ) : file.type.includes("video/") ? (
                        <video
                          className="w-full"
                          controls
                          src={file.url || URL.createObjectURL(file)}
                        />
                      ) : (
                        <p>File type: {file.type}</p>
                      )}
                    </div>
                  ))}
              </>
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
        </div>
      </div>
    </>
  );
}
