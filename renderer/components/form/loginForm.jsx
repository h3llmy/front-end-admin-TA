import { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import InputText from "../input/inputText";
import InputPassword from "../input/inputPassword";
import { getLoginCookie, setCookie } from "../../../utils/cookie";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkCooie = async () => {
    if (await getLoginCookie("user")) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    checkCooie();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const [loginToken] = await Promise.all([
        fetchApi.post("/auth/login", {
          username,
          password,
        }),
      ]);
      setCookie("user", loginToken.data.data.refreshToken);
      router.push("/dashboard");
    } catch (error) {
      if (error.response?.data?.message === "Invalid username or password") {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.data?.message === "error validations") {
        setErrorMessage(error.response.data.path);
      } else {
        setErrorMessage(error.message || "something worng please retry");
      }
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h1 className="text-4xl text-center mb-8 font-semibold">Login</h1>
        <InputText
          name={"Username"}
          inputValue={(value) => {
            setUsername(value);
          }}
          autoFocus
          onError={errorMessage.username}
        />
      </div>
      <div className="mb-6">
        <InputPassword
          name={"Password"}
          inputValue={(value) => {
            setPassword(value);
          }}
          onError={
            errorMessage.password ||
            (typeof errorMessage == "string" && errorMessage)
          }
        />
      </div>
      <div className="flex justify-between">
        <a href="#" className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
          <u>forget your password?</u>
        </a>
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Login
        </button>
      </div>
    </form>
  );
}
