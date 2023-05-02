import LoginForm from "../components/form/loginForm";

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="dark:bg-gray-800 border-2 bg-gray-200 border-black rounded-lg w-2/4">
        <div className="m-10">{/* <LoginForm /> */}</div>
      </div>
    </div>
  );
};

ForgetPassword.getLayout = (page) => {
  return <>{page}</>;
};

export default ForgetPassword;
