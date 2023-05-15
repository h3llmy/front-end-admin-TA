import { useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import appConfig from "../../../main/appConfig";
import InputText from "../input/inputText";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handdleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchApi.post("/auth/forget/password", {
        email: email,
        url: appConfig.WEB_URL,
      });
      alert("check your email");
      setErrorMessage("");
      router.push("/login");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handdleSubmit}>
      <InputText
        name={"Email"}
        inputValue={(value) => {
          setEmail(value);
        }}
        autoFocus
        onError={errorMessage.email}
      />

      <div className="flex justify-between mt-4">
        <Link href={"/login"}>
          <a className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
            <u className="text-blue-500">Back To Login</u>
          </a>
        </Link>
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Send Email
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
