import { useState } from "react";
import InputDate from "../input/inputDate";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import { getLoginCookie } from "../../../utils/cookie";
import axios from "axios";
import LoadingAnimation from "../loading/loadingAnimation";

const ReportForm = ({ label, color, setModal }) => {
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [currentDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event, fileFormat) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const report = await fetchApi.post(
        `/order/create-report/${fileFormat}`,
        { from, until },
        {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }
      );
      await downloadFile(report?.data?.data?.fileUrl);
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (fileUrl) => {
    if (fileUrl) {
      try {
        const cookie = await getLoginCookie("user");
        const response = await axios.get(fileUrl, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        });
        const blob = new Blob([response.data]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        throw new Error("Failed to generate a report");
      }
    } else {
      throw new Error("Failed to generate a report");
    }
  };

  return (
    <form>
      <div className="grid grid-cols-2 gap-5">
        <InputDate
          name={"From"}
          inputValue={setFrom}
          disable={false}
          onError={
            errorMessage?.from ||
            (typeof errorMessage == "string" && errorMessage)
          }
        />
        <InputDate
          name={"Until"}
          inputValue={setUntil}
          defaultValue={currentDate}
          disable={false}
          onError={errorMessage?.until}
        />
      </div>
      <div className="px-6 py-4 flex justify-end space-x-4 items-center">
        <button
          onClick={(event) => handleSubmit(event, "pdf")}
          disabled={isLoading}
          className={`${
            color ? color : "bg-gray-500 hover:bg-gray-600"
          } px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline-gray`}
        >
          {isLoading ? <LoadingAnimation /> : "Create PDF"}
        </button>
        <button
          onClick={(event) => handleSubmit(event, "csv")}
          disabled={isLoading}
          className={`${
            color ? color : "bg-gray-500 hover:bg-gray-600"
          } px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline-gray`}
        >
          {isLoading ? <LoadingAnimation /> : "Create CSV"}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
