import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../Services/UserService";
import Back from "../components/Back";
import fire from "../../Utils/Toast";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  userId: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  emailAddress: string;
  phoneNumber: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn: string;
}

const ViewUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get user by ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await UserService.getUserById(userId);
          console.log("API call response:", response);

          // Ensure the data is correctly accessed
          if (response && response.data) {
            setUserDetails(response.data);
          } else {
            setError(`Failed to fetch User details: Status ${response.status}`);
          }
        } catch (error) {
          console.error("Failed to fetch User details:", error);
          setError("Failed to fetch User details");
        } finally {
          setLoading(false);
        }
      } else {
        setError("User ID is missing");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails) {
      // Create a new object with necessary properties
      const updatedData = {
        tenantId: userDetails.tenantId,
        userId: userDetails.userId,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        middleName: userDetails.middleName,
        emailAddress: userDetails.emailAddress,
        phoneNumber: userDetails.phoneNumber,
      };

      try {
        await UserService.updateUser(updatedData);
        fire("success", "User updated successfully");
        navigate("/users");
      } catch {
        fire("error", "Failed to update user");
      }
    }
  };

  return (
    <>
      <div className="py-2">
        <Back />
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-primary">User Details</h3>
        {userDetails ? (
          <>
            <div className="text-center text-3xl font-bold mb-6">
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </div>
            {/* Details */}
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* User Id */}
              <div className="flex flex-col px-4">
                <label className="p-2">User Id:</label>
                <input
                  type="text"
                  value={userDetails.userId}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  readOnly
                  required
                />
              </div>

              {/* Tenant Id */}
              <div className="flex flex-col px-4">
                <label className="p-2">Tenant Id:</label>
                <input
                  type="text"
                  value={userDetails.tenantId}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  readOnly
                  required
                />
              </div>

              {/* First Name */}
              <div className="flex flex-col px-4">
                <label className="p-2">First Name:</label>
                <input
                  type="text"
                  value={userDetails.firstName}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col px-4">
                <label className="p-2">Last Name:</label>
                <input
                  type="text"
                  value={userDetails.lastName}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Middle Name */}
              <div className="flex flex-col px-4">
                <label className="p-2">Middle Name:</label>
                <input
                  type="text"
                  value={userDetails.middleName}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      middleName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col px-4">
                <label className="p-2">Email Address:</label>
                <input
                  type="email"
                  value={userDetails.emailAddress}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      emailAddress: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col px-4">
                <label className="p-2">Phone Number:</label>
                <input
                  type="tel"
                  value={userDetails.phoneNumber}
                  className="border border-primary p-2 text-xl font-bold text-gray-400"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-5 col-span-2 py-4 ">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-primary text-1xl font-semibold px-3.5 py-3 text-white rounded-md shadow-md w-1/2"
                >
                  {loading ? "Loading" : "Update User"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div>User not found</div>
        )}
      </div>
    </>
  );
};

export default ViewUser;
