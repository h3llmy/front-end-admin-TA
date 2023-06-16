const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mr-1 animate-pulse text-blue-800 dark:text-blue-200">
        Loading
      </div>
      <div className="flex space-x-2 mt-2">
        <div
          className="h-1 w-1 animate-ping rounded-full bg-blue-800 dark:bg-blue-200"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="h-1 w-1 animate-ping rounded-full bg-blue-800 dark:bg-blue-200"
          style={{ animationDelay: "0.6s" }}
        ></div>
        <div
          className="h-1 w-1 animate-ping rounded-full bg-blue-800 dark:bg-blue-200"
          style={{ animationDelay: "0.9s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
