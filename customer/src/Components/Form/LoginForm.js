import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCustomer, verifyOTP } from "../../app/Redux/Action/customerActions";
import { Link } from "react-router-dom";
function Login() {
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleCreateAccount = () => {
    navigate("/register");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");
  //   try {
  //     const credentials = { contact_no: contactNo, password };
  //     const response = await dispatch(loginCustomer(credentials)).unwrap();
  //     setIsLoginSubmitted(true);
  //     setOtpToken(response.otpToken);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setErrorMessage("Login failed. Please check your credentials.");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      const credentials = { contact_no: contactNo, password };
      const response = await dispatch(loginCustomer(credentials)).unwrap();
      setIsLoginSubmitted(true);
      setOtpToken(response.otpToken);
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedContactNo = contactNo.trim();
    const trimmedOtp = otp.trim();

    if (!trimmedContactNo || !trimmedOtp) {
      setErrorMessage("Please enter both contact number and OTP.");
      return;
    }

    const otpData = { otp: trimmedOtp, otpToken, contact_no: trimmedContactNo }; // Include otpToken

    console.log("Verifying OTP with data:", otpData);

    try {
      const response = await dispatch(verifyOTP(otpData)).unwrap();
      console.log("OTP verification successful:", response);
      navigate("/");
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error);
      const message =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 sm:pt-12">
      <div className="w-full max-w-[400px] px-6">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold">
            <span className=" text-2xl text-black font-bold ">Welcome To </span>
           <Link to="/">
            <span className="text-2xl text-yellow-600 font-bold  ">Tnp</span>
            <span className=" text-2xl text-blue-600 font-bold ">Ecom</span>
            </Link>
          </h1>
        </div>
        <div className="border border-gray-300 rounded-lg p-6 mb-4">
          <h1 className="text-3xl font-normal mb-4">
            {isLoginSubmitted ? "Verification required" : "Sign in"}
          </h1>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {!isLoginSubmitted ? (
            // <form className="space-y-4" onSubmit={handleLogin}>
            //   <div>
            //     <label
            //       htmlFor="contact_no"
            //       className="block text-sm font-bold mb-2"
            //     >
            //       Mobile number
            //     </label>
            //     <input
            //       type="text"
            //       id="contact_no"
            //       className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
            //       value={contactNo}
            //       onChange={(e) => setContactNo(e.target.value)}
            //       required
            //     />
            //   </div>
            //   <div>
            //     <label
            //       htmlFor="password"
            //       className="block text-sm font-bold mb-2"
            //     >
            //       Password
            //     </label>
            //     <input
            //       type="password"
            //       id="password"
            //       className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
            //       value={password}
            //       onChange={(e) => setPassword(e.target.value)}
            //       required
            //     />
            //   </div>
            //   <button
            //     type="submit"
            //     className="w-full bg-[#f0c14b] border border-[#a88734] rounded-[3px] py-[6px] px-[10px] text-sm focus:outline-none focus:shadow-custom hover:bg-[#f1c860]"
            //   >
            //     Continue
            //   </button>
            // </form>
            <form className="space-y-4" onSubmit={handleLogin}>
  <div>
    <label htmlFor="contact_no" className="block text-sm font-bold mb-2">
      Mobile number
    </label>
    <input
      type="text"
      id="contact_no"
      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
      value={contactNo}
      onChange={(e) => setContactNo(e.target.value)}
      required
    />
  </div>
  <div>
    <label htmlFor="password" className="block text-sm font-bold mb-2">
      Password
    </label>
    <input
      type="password"
      id="password"
      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full bg-[#f0c14b] border border-[#a88734] rounded-[3px] py-[6px] px-[10px] text-sm focus:outline-none focus:shadow-custom hover:bg-[#f1c860] ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isLoading ? (
      <span className="flex justify-center items-center">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-black"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        Loading...
      </span>
    ) : (
      "Continue"
    )}
  </button>
</form>

          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOTP}>
              <p className="text-sm mb-4">
                To continue, we need to verify your account. We've sent a One
                Time Password (OTP) to your registered email or phone number.
              </p>
              <div>
                <label htmlFor="otp" className="block text-sm font-bold mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#f0c14b] border border-[#a88734] rounded-[3px] py-[6px] px-[10px] text-sm focus:outline-none focus:shadow-custom hover:bg-[#f1c860]"
              >
                Verify
              </button>
            </form>
          )}
        </div>
        <div className="text-xs text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <button
            onClick={handleCreateAccount}
            className="w-full bg-[#f1f1f1] border border-gray-300 rounded-[3px] py-[6px] px-[10px] text-sm focus:outline-none hover:bg-[#e7e9ec]"
          >
            Create your account
          </button>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-300 w-full max-w-[350px] text-xs text-center text-blue-600">
        <button className="text-blue-600 hover:text-[#c45500] hover:underline">
          Need Help?
        </button>
      </div>
    </div>
  );
}

export default Login;


 