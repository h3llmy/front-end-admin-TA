import LoadingAnimation from "../loading/loadingAnimation";

const Counter = ({ label, data }) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 shadow-md">
        {data ? (
          <>
            <div className="font-bold">{label}</div>
            <div className="w-full flex justify-end text-lg font-bold">
              {data}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <LoadingAnimation />
          </div>
        )}
      </div>
    </>
  );
};

export default Counter;
