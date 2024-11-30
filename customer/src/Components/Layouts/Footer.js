import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-14 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  About TNP
                </button>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Sell products on TNP
                </button>
              </li>
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Sell on TNP Business
                </button>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Your Account
                </button>
              </li>
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Your Orders
                </button>
              </li>
              <li>
                <button className="text-left hover:text-blue-400 transition">
                  Shipping Rates & Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                {/* Facebook Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0H1.325C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24h11.495v-9.294H9.693v-3.619h3.127V8.411c0-3.106 1.857-4.798 4.569-4.798 1.313 0 2.442.098 2.773.142v3.222h-1.904c-1.493 0-1.779.712-1.779 1.757v2.305h3.557l-.464 3.619h-3.093V24h6.068c.733 0 1.325-.592 1.325-1.325V1.325C24 .592 23.408 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.017-.611 1.794-1.574 2.165-2.724-.951.555-2.007.959-3.127 1.184-.896-.955-2.169-1.55-3.594-1.55-2.721 0-4.931 2.21-4.931 4.932 0 .387.045.765.127 1.124-4.103-.205-7.738-2.164-10.18-5.144-.426.731-.669 1.577-.669 2.481 0 1.713.87 3.22 2.188 4.106-.805-.025-1.564-.246-2.229-.616v.062c0 2.39 1.698 4.38 3.946 4.834-.414.112-.848.171-1.293.171-.316 0-.625-.031-.933-.086.631 1.956 2.448 3.384 4.592 3.426-1.684 1.318-3.805 2.105-6.094 2.105-.395 0-.787-.023-1.174-.067 2.174 1.39 4.766 2.205 7.548 2.205 9.056 0 14.004-7.493 14.004-13.95 0-.213-.005-.426-.014-.637.961-.693 1.8-1.558 2.465-2.548z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.225 0h-20.451C.996 0 0 .996 0 2.225v19.551C0 23.004.996 24 2.225 24h20.451C23.004 24 24 23.004 24 22.225v-19.55C24 .996 23.004 0 22.225 0zM7.073 20.452H3.658V9.684h3.415v10.768zM5.865 8.62c-1.086 0-1.957-.871-1.957-1.958 0-1.086.871-1.957 1.957-1.957 1.087 0 1.957.871 1.957 1.957 0 1.087-.87 1.958-1.957 1.958zm15.587 11.832h-3.415v-5.658c0-1.351-.024-3.088-1.885-3.088-1.885 0-2.174 1.471-2.174 2.993v5.753h-3.415V9.684h3.287v1.466h.046c.458-.866 1.577-1.78 3.246-1.78 3.471 0 4.116 2.284 4.116 5.256v5.826h-.002z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <img
            src="https://www.tnp.net.uk/app/uploads/2021/10/Group@2x.png"
            alt="TNP Logo"
            className="h-10 w-auto mb-4 md:mb-0"
          />
          {/* Copyright Text */}
          <p className="text-sm text-gray-400">&copy; 2024, TNP.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
