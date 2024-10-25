// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie"; // Importing js-cookie

// const Login = ({ onLoginSuccess }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [screen, setScreen] = useState("welcome"); // 'welcome' or 'login'
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/users/login",
//         {
//           user_name: username,
//           password: password,
//         },
//         { withCredentials: true }
//       );

//       // Log the entire response
//       console.log("Login response status:", response.status);
//       console.log("Login response headers:", response.headers);
//       console.log("Login response data:", response.data);

//       // Now check if tokens are received in the response body
//       const accessToken = response.data.accessToken; // Now it will be present
//       const refreshToken = response.data.refreshToken; // Optionally retrieve if needed

//       if (accessToken) {
//         // Set tokens in cookies (optional, but can be useful for debugging)
//         Cookies.set("access_token", accessToken, { expires: 7 });
//         console.log("Access Token set in cookies:", Cookies.get("access_token")); // Debugging line
//         if (refreshToken) {
//           Cookies.set("refresh_token", refreshToken, { expires: 7 });
//           console.log("Refresh Token set in cookies:", Cookies.get("refresh_token")); // Debugging line
//         }

//         onLoginSuccess(); // Call success handler
//       } else {
//         setErrorMessage("Login failed: No access token found in response");
//       }
//     } catch (error) {
//       console.error("Login error:", error); // Log the entire error object for debugging
//       console.log("Error response data:", error.response?.data); // Log the error response data
//       setErrorMessage(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const startLogin = () => setScreen("login");

//   // Welcome screen
//   if (screen === "welcome") {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <img
//           aria-hidden="true"
//           alt="welcome"
//           src="https://openui.fly.dev/openui/100x100.svg?text=🗝️"
//           className="mb-4"
//         />
//         <h1 className="text-3xl font-serif text-blue-600 mb-4">Welcome</h1>
//         <p className="text-gray-600 mb-4">Please log in to continue.</p>
//         <button
//           onClick={startLogin}
//           className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
//         >
//           Log In
//         </button>
//       </div>
//     );
//   }

//   // Login screen
//   return (
//     <div className="min-h-screen flex">
//       <div
//         className="w-1/2 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://media.istockphoto.com/id/2093483159/photo/cybersecurity-concept-2fa-authentication-for-log-in.jpg?s=2048x2048&w=is&k=20&c=V95bgLsO9gxRYdxgL92ycB-aw4FAHsLTueZ7QiKv41g=')",
//         }}
//       ></div>

//       <div className="w-1/2 flex items-center justify-center">
//         <div className="w-full max-w-md p-8 space-y-6">
//           <h2 className="text-3xl font-bold text-center">Login</h2>

//           {errorMessage && (
//             <p className="text-red-500 text-center">{errorMessage}</p>
//           )}

//           <form onSubmit={handleLogin} className="mt-8 space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading} // Disable button when loading
//               >
//                 {isLoading ? "Logging in..." : "Log in"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [screen, setScreen] = useState("welcome"); // 'welcome' or 'login'
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          user_name: username,
          password: password,
        },
        { withCredentials: true }
      );

      // Log the entire response
      console.log("Login response status:", response.status);
      console.log("Login response headers:", response.headers);
      console.log("Login response data:", response.data);

      // Now check if tokens are received in the response body
      const accessToken = response.data.accessToken; // Now it will be present
      const refreshToken = response.data.refreshToken; // Optionally retrieve if needed

      if (accessToken) {
        // Set tokens in cookies
        Cookies.set("access_token", accessToken, { expires: 7 });
        console.log("Access Token set in cookies:", Cookies.get("access_token")); // Debugging line
        if (refreshToken) {
          Cookies.set("refresh_token", refreshToken, { expires: 7 });
          console.log("Refresh Token set in cookies:", Cookies.get("refresh_token")); // Debugging line
        }

        // Set username in cookies
        Cookies.set("username", username, { expires: 7 }); // Set the username in cookies
        console.log("Username set in cookies:", Cookies.get("username")); // Debugging line

        onLoginSuccess(); // Call success handler
      } else {
        setErrorMessage("Login failed: No access token found in response");
      }
    } catch (error) {
      console.error("Login error:", error); // Log the entire error object for debugging
      console.log("Error response data:", error.response?.data); // Log the error response data
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const startLogin = () => setScreen("login");

  // Welcome screen
  if (screen === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <img
          aria-hidden="true"
          alt="welcome"
          src="https://openui.fly.dev/openui/100x100.svg?text=🗝️"
          className="mb-4"
        />
        <h1 className="text-3xl font-serif text-blue-600 mb-4">Welcome</h1>
        <p className="text-gray-600 mb-4">Please log in to continue.</p>
        <button
          onClick={startLogin}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          Log In
        </button>
      </div>
    );
  }

  // Login screen
  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2093483159/photo/cybersecurity-concept-2fa-authentication-for-log-in.jpg?s=2048x2048&w=is&k=20&c=V95bgLsO9gxRYdxgL92ycB-aw4FAHsLTueZ7QiKv41g=')",
        }}
      ></div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
