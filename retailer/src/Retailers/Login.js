import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  const [retname, setRetname] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [showLogin, setShowLogin] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:3000/api/retailers/login', {
        retname,  
        password,
      }, { withCredentials: true }); 

      console.log('Login response:', response); 

      if (response.status === 200) {
        navigate('/dashboard');  
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin); 
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      {!showLogin ? (
        <div className="text-center text-white">
         
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">Welcome to </span>
            <span className="text-blue-600">TNP </span>
            <span className="text-yellow-500">E_com</span>
            <span className="text-5xl">👋</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            The best platform for your <span className="text-blue-600 font-semibold uppercase">RETAIL</span> needs. Please log in to continue.
          </p>

          {/* Login Button */}
          <span 
            onClick={toggleLogin}
            className="text-5xl cursor-pointer hover:text-blue-700 transition duration-300"
          >
            🔐
          </span>
        </div>
      ) : (

<div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Welcome Back!</h1>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4" aria-live="assertive">{errorMessage}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col space-y-4">
              {/* Username Input */}
              <div>
                <label htmlFor="retname" className="block font-medium text-gray-400">Username</label>
                <input
                  id="retname"
                  type="text"
                  value={retname}
                  onChange={(e) => setRetname(e.target.value)}
                  required
                  minLength="3"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block font-medium text-gray-400">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center mt-4 text-green-600">
            New user?{' '}
            <button onClick={handleRegister} className="text-blue-500 hover:underline">Register here</button>
          </p>
          <p className="text-center mt-4 text-gray-400 cursor-pointer" onClick={toggleLogin}>
            Go back to welcome page
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
