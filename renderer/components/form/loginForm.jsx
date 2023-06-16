import { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import InputText from "../input/inputText";
import InputPassword from "../input/inputPassword";
import { getLoginCookie, setCookie } from "../../../utils/cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import errorHanddler from "../../../utils/errorHanddler";

const LoginForm = () => {
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
      errorHanddler(error, setErrorMessage);
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
        <Link href={"/forget-password"}>
          <a className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
            <u className="text-blue-500">forget your password?</u>
          </a>
        </Link>
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
