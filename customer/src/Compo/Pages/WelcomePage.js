import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  // Redirect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile"); // Change this to the route you want to redirect to
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Tnp Ecom!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for logging in! You will be redirected shortly...
        </p>
        <p className="text-sm text-gray-500">
          If you are not redirected, click <a href="/home" className="text-blue-600 hover:underline">here</a>.
        </p>
      </div>
    </div>
  );
}
