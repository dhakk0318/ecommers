import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerData,
  fetchProfiles,
} from "../../../app/Redux/Action/profileActions";
import {
  MapPin,
  Phone,
  Edit,
  Package,
  CreditCard,
  User,
  ChevronRight,
} from "lucide-react";
import UpdateProfileModal from "./UpdateProfile";

export default function ProfileList() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profiles);
  const { profiles, customer, status, error } = profileState || {};

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchCustomerData());
  }, [dispatch]);

  if (!profileState) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: Unable to access profile state
      </div>
    );
  }

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (status === "failed")
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );

  const handleEditClick = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        {customer ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500">
              <h1 className="text-2xl font-bold text-center text-white mb-4">
                Hello, {customer.customer_name}
              </h1>
              
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileCard
                  icon={<Package className="h-8 w-8" />}
                  title="Your Orders"
                  description="Track, return, or buy things again"
                />
                <ProfileCard
                  icon={<User className="h-8 w-8" />}
                  title="Login & Security"
                  description="Edit login, name, and mobile number"
                />
                <ProfileCard
                  icon={<CreditCard className="h-8 w-8" />}
                  title="Your Payments"
                  description="Manage payment methods and settings"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium mb-4">
            Loading customer details...
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Your Addresses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <div
                key={profile.cid}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={
                          profile.profile_image ||
                          "https://via.placeholder.com/100"
                        }
                        alt={`Profile ${profile.cid}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleEditClick(profile)}
                      className="text-blue-600 hover:text-blue-800 transition duration-300"
                      aria-label="Edit profile"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-1" />
                      <p className="text-sm">{profile.address}</p>
                    </div>

                    {profile.alternate_address && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-1" />
                        <p className="text-sm">{profile.alternate_address}</p>
                      </div>
                    )}

                    {profile.alternate_contact_no && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-gray-500" />
                        <p className="text-sm">
                          {profile.alternate_contact_no}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600">No addresses found.</p>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded">
                Add a new address
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedProfile && (
        <UpdateProfileModal
          profile={selectedProfile}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

function ProfileCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
      <div className="text-yellow-500">{icon}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}
