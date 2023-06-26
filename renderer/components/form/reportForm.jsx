import { useState } from "react";
import InputDate from "../input/inputDate";
import ModalFormButton from "../button/modalFormButton";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import { getLoginCookie } from "../../../utils/cookie";
import axios from "axios";

const ReportForm = ({ label, color, setModal }) => {
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [currentDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const report = await fetchApi.post(
        "/order/create-report",
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
    <form onSubmit={handleSubmit}>
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
      <ModalFormButton
        buttonName={label}
        color={color}
        onDecline={() => {
          setModal(false);
        }}
      />
    </form>
  );
};

export default ReportForm;
