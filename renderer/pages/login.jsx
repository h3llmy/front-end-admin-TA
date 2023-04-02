import LoginForm from "../components/form/loginForm";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <h1 className="text-3xl dark:text-white text-black">
                Welcome to
            </h1>
            <h1 className="text-2xl dark:text-white text-black mb-10">
                Admin Semua Aplikasi Indonesia
            </h1>
            <div className="dark:bg-gray-600 border-2 border-black rounded-md w-2/4">
                <div className="m-3">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}