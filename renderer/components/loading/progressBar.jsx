const ProgressBar = ({ progress }) => {
  return (
    <>
      {progress > 0 && progress !== 100 && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-1 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-end mb-1">
            <span className="text-sm font-medium text-blue-700 dark:text-white">
              {progress}%
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default ProgressBar;
