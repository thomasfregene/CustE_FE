import React, { useEffect, useState } from "react";
import { UserList as UserListType } from "../../Variables/Users/UserList";
import UserService from "../../Services/UserService";
import Pagination from "../../Utils/Pagination";
import { useNavigate } from "react-router-dom";
import fire from "../../Utils/Toast";
//import fire from "../../Utils/Toast";

const GetUser: React.FC = () => {
  const [user, setUser] = useState<UserListType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Move fetchUsers function outside of useEffect
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        startDate: "",
        endDate: "",
        pageSize,
        pageIndex: currentPage,
        search: debouncedSearchTerm,
        tenant: "",
      };

      const usersResponse = await UserService.getUser(params);
      if (usersResponse && usersResponse.data) {
        console.log("Fetched User:", usersResponse);
        const result = usersResponse.result || usersResponse.data.result || [];
        setUser(result);
        setTotalPages(usersResponse.data.totalPages || 1);
      } else {
        console.log("Failed to fetch User.");
        setUser([]);
      }
    } catch {
      setError("Failed to fetch User");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setDebouncedSearchTerm(searchTerm);
  };

  // Function to handle view user details
  const handleViewUser = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  // Function to handle activating/deactivating a user
  const handleToggleUserStatus = async (userId: string) => {
    try {
      await UserService.activateUser(userId);
      fire("success", "User status updated successfully");

      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
      fire("error", "Error updating user status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User List</h2>

      {/* Search input and button */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded w-full px-3 py-2"
          />
          <button
            onClick={handleSearchClick}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        <small className="text-primary">Search by name or email</small>
      </div>

      {user.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 overflow-auto">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  User Id
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Tenant Id
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Firstname
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Lastname
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Middlename
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Email Address
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Phone Number
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Active Status
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.userId}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.tenantId}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.firstName}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.lastName}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.middleName}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.emailAddress}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.phoneNumber}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.isActive ? "True" : "False"}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    <button onClick={() => handleViewUser(user.userId)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button onClick={() => handleToggleUserStatus(user.userId)}>
                      {user.isActive ? (
                        <i className="fas fa-user-slash ml-4 text-red-500"></i>
                      ) : (
                        <i className="fas fa-user-check ml-4 text-green-500"></i>
                      )}
                    </button>
                    <button>
                      <i className="fas fa-trash ml-4 text-red-500"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No User found.</div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GetUser;
