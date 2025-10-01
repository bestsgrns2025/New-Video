
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/auth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validatePassword = (password: string) => {
            const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{1,10}$/;
            return regex.test(password);
        };

        if (!validatePassword(password)) {
            setError('Password must contain at least one special character, one capital letter, one number, and be a maximum of 10 characters long.');
            return;
        }

        try {
            await adminLogin({ email, password });
            navigate('/admin/dashboard');
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">Admin Login</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form className="px-5 py-7" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-center pb-3">{error}</p>}
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input
                            type="email"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input
                            type="password"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            <span className="inline-block mr-2">Login</span>
                        </button>
                    </form>
                    <div className="py-5">
                        <div className="text-center">
                            <a href="/forgot-password" className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <span className="inline-block ml-1">Forgot Password?</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
