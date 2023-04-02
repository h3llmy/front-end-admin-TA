export default function LoginForm() {
    return (
        <form>
            <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                    Username
                </label>
                <input type="text" placeholder="Username" id="username" className="text-black border border-green-500 text-green-900 text-sm rounded-lg block w-full p-2.5 dark:border-green-400" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
                    Password
                </label>
                <input type="password" placeholder="Password" id="password" className="text-black border border-green-500 text-green-900 text-sm rounded-lg block w-full p-2.5 dark:border-green-400" />
            </div>
            <div className="flex justify-between">
                <a href="" className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
                    <u>
                        forget your password?
                    </u>
                </a>
                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Login
                </button>
            </div>
        </form>
    )
}