import { Mail, Phone, MapPin, Calendar } from "lucide-react";

function Component() {
  const customerInfo = {
    name: "Shubham",
    email: "shubham@example.com",
    phone: "+91 9584842002",
    address: "789 Rajharsh Coloney Bhopal MP",
    memberSince: "October 15, 2024",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-md">
                {customerInfo.name[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {customerInfo.name}
                </h1>
                <p className="text-gray-500 font-medium">
                  Customer ID: <span className="text-gray-700">#CR-12345</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Personal Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center text-gray-700">
                <Mail className="mr-3 h-5 w-5 text-indigo-500" />
                <span className="font-medium">{customerInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="mr-3 h-5 w-5 text-indigo-500" />
                <span className="font-medium">{customerInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="mr-3 h-5 w-5 text-indigo-500" />
                <span className="font-medium">{customerInfo.address}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
                <span className="font-medium">
                  Member since {customerInfo.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
