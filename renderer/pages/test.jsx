import { useState } from "react";

export default function Test() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
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
    <div className="relative">
      <input type="file" multiple onChange={handleFileSelect} />
      <div className="carousel">
        {selectedFiles &&
          selectedFiles.map((file, index) => (
            <div
              key={file.name}
              className={`carousel-item ${
                index === currentSlide ? "active" : "hidden"
              }`}
            >
              {file.type.includes("image/") ? (
                <img src={URL.createObjectURL(file)} alt={file.name} />
              ) : (
                <p>File type: {file.type}</p>
              )}
              <p>{file.name}</p>
              <button onClick={() => handleFileRemove(index)}>Remove</button>
            </div>
          ))}
        <button className="carousel-control prev" onClick={handlePrevSlide}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={handleNextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}
