import { useState } from 'react';
import { fetchApi } from '../../../utils/fetch';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const [loginToken] = await Promise.all([
                fetchApi.post('/auth/login', {
                    username,
                    password
                })
            ])
            console.log(loginToken);
        } catch (error) {
            if (error.response.data.message === 'Invalid username or password') {
                setErrorMessage(error.response.data.message)
            }
            if (error.response.data.message === 'error validations') {
                setErrorMessage(error.response.data.path)
            }
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <h1 className="text-4xl text-center mb-8 font-semibold">Login</h1>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                    Username
                </label>
                <input type="text" placeholder="Username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} className="text-black border border-green-500 text-green-900 text-sm rounded-lg block w-full p-2.5 dark:border-green-400" />
                {errorMessage?.username && typeof errorMessage === 'object' && (
                    <div className='text-[#FF0000] font-semibold'>
                        {errorMessage.username}
                    </div>
                )}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
                    Password
                </label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="text-black border border-green-500 text-green-900 text-sm rounded-lg block w-full p-2.5 dark:border-green-400" />
                {errorMessage?.password && typeof errorMessage === 'object' && (
                    <div className='text-[#FF0000] font-semibold'>
                        {errorMessage.password}
                    </div>
                )}
            </div>
            {errorMessage && typeof errorMessage === 'string' && (
                <div className='text-[#FF0000] font-semibold mb-2'>
                    {errorMessage}
                </div>
            )}
            <div className="flex justify-between">
                <a href='#' className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
                    <u>
                        forget your password?
                    </u>
                </a>
                <button type="submit" className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Login
                </button>
            </div>
        </form>
    )
}
