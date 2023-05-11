import { useState } from "react";
import InputDate from "../input/inputDate";
import ModalFormButton from "../button/modalFormButton";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import { getLoginCookie } from "../../../utils/cookie";

export default function ReportForm({ label, color, setModal }) {
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
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
      downloadFile(report?.data?.data?.fileUrl);
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const downloadFile = (fileUrl) => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      throw new Error("failed to generate a report");
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
          defaultValue={new Date().toDateString()}
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
}
